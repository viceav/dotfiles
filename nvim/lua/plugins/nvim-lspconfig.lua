local servers = {
  "html",
  "cssls",
  "ts_ls",
  "clangd",
  "pylsp",
  "jsonls",
  "bashls",
  "cmake",
  "tailwindcss",
  "rust_analyzer",
  "dockerls",
  "racket_langserver",
}

local M = {
  "neovim/nvim-lspconfig",
  dependencies = "nvim-cmp",
  config = function()
    -- Set the path to the TeXLive distribution
    vim.env.MANPATH = "/usr/local/texlive/2024/texmf-dist/doc/man"
    vim.env.INFOPATH = "/usr/local/texlive/2024/texmf-dist/doc/info"
    vim.env.PATH = "/usr/local/texlive/2024/bin/x86_64-linux" .. ":" .. vim.env.PATH
    vim.env.PDFVIEWER = "zathura"

    local set_mappings = require "plugins.utils.mappings"
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

    lspconfig.angularls.setup {
      capabilities = capabilities,
      on_attach = function(client, bufnr)
        set_mappings(client, bufnr)
      end,
      on_new_config = function(new_config, new_root_dir)
        local install_path = require("mason-core.package").get_install_path { name = "angular-language-server" }
          .. "/node_modules"
        local ang = install_path .. "/@angular/language-server/node_modules"

        local cmd = {
          "ngserver",
          "--stdio",
          "--tsProbeLocations",
          install_path,
          "--ngProbeLocations",
          ang,
        }

        new_config.cmd = cmd
      end,
    }

    lspconfig.texlab.setup {
      capabilities = capabilities,
      on_attach = function(client, bufnr)
        set_mappings(client, bufnr)
      end,
      settings = {
        texlab = {
          build = {
            onSave = true,
            args = { "-auxdir=aux", "-pdf", "-interaction=nonstopmode", "-synctex=1", "%f" },
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
          chktex = {
            onEdit = true,
            onOpenAndSave = true,
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
