local servers =
  { "html", "cssls", "ts_ls", "clangd", "pylsp", "jsonls", "bashls", "cmake", "tailwindcss", "rust_analyzer" }

local map = vim.keymap.set

local function set_mappings(client, bufnr)
  local function opts(desc)
    return { buffer = bufnr, desc = "LSP " .. desc }
  end

  if client.supports_method "textDocument/implementation" then
    map("n", "gi", vim.lsp.buf.implementation, opts "Go to implementation")
  end
  if client.supports_method "textDocument/declaration" then
    map("n", "gD", vim.lsp.buf.declaration, opts "Go to declaration")
  end
  if client.supports_method "textDocument/definition" then
    map("n", "gd", vim.lsp.buf.definition, opts "Go to definition")
  end
  if client.supports_method "textDocument/typeDefinition" then
    map("n", "<leader>D", vim.lsp.buf.type_definition, opts "Go to type definition")
  end
  if client.supports_method "textDocument/signatureHelp" then
    map("n", "<leader>sh", vim.lsp.buf.signature_help, opts "Show signature help")
  end
  if client.supports_method "workspace/workspaceFolders" then
    map("n", "<leader>wa", vim.lsp.buf.add_workspace_folder, opts "Add workspace folder")
    map("n", "<leader>wr", vim.lsp.buf.remove_workspace_folder, opts "Remove workspace folder")
    map("n", "<leader>wl", function()
      print(vim.inspect(vim.lsp.buf.list_workspace_folders()))
    end, opts "List workspace folders")
  end
  if client.supports_method "textDocument/diagnostics" then
    map("n", "<leader>we", function()
      vim.diagnostic.setqflist { severity = "ERROR" }
    end, opts "Show Errors")
    map("n", "<leader>ww", function()
      vim.diagnostic.setqflist { severity = "WARN" }
    end, opts "Show Warnings")
  end
  if client.supports_method "textDocument/rename" then
    map("n", "<leader>rn", vim.lsp.buf.rename, opts "Rename")
  end
  if client.supports_method "textDocument/codeAction" then
    map("n", "<leader>ca", vim.lsp.buf.code_action, opts "Code Action")
  end
  if client.supports_method "textDocument/references" then
    map("n", "gr", vim.lsp.buf.references, opts "Show references")
  end
end

local M = {
  "neovim/nvim-lspconfig",
  dependencies = "nvim-cmp",
  config = function()
    local lspconfig = require "lspconfig"
    local capabilities = require("cmp_nvim_lsp").default_capabilities()

    for _, lsp in ipairs(servers) do
      lspconfig[lsp].setup {
        capabilities = capabilities,
        on_attach = function(client, bufnr)
          set_mappings(client, bufnr)
        end,
      }
    end

    lspconfig.texlab.setup {
      capabilities = capabilities,
      on_attach = function(client, bufnr)
        set_mappings(client, bufnr)
      end,
      settings = {
        texlab = {
          build = {
            onSave = true,
            args = { "-auxdir=aux", "-pdf", "-synctex=1", "%f" },
            forwardSearchAfter = true,
          },
          forwardSearch = {
            executable = "zathura",
            args = {
              "--synctex-forward",
              "%l:1:%f",
              "%p",
            },
          },
        },
      },
    }

    lspconfig.lua_ls.setup {
      on_attach = function(client, bufnr)
        set_mappings(client, bufnr)
      end,
      on_init = function(client)
        if client.workspace_folders then
          local path = client.workspace_folders[1].name
          if vim.uv.fs_stat(path .. "/.luarc.json") or vim.uv.fs_stat(path .. "/.luarc.jsonc") then
            return
          end
        end

        client.config.settings.Lua = vim.tbl_deep_extend("force", client.config.settings.Lua, {
          runtime = {
            -- Tell the language server which version of Lua you're using
            -- (most likely LuaJIT in the case of Neovim)
            version = "LuaJIT",
          },
          -- Make the server aware of Neovim runtime files
          workspace = {
            checkThirdParty = false,
            library = {
              vim.env.VIMRUNTIME,
            },
          },
        })
      end,
      settings = {
        Lua = {},
      },
    }
  end,
  event = "BufRead",
}

return M
