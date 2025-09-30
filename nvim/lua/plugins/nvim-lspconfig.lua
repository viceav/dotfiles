local M = {
  "neovim/nvim-lspconfig",
  dependencies = {
    "nvim-cmp",
    {
      "mfussenegger/nvim-lint",
      config = function()
        local lint = require "lint"
        lint.linters_by_ft = {
          typescriptreact = { "eslint_d" },
          python = { "ruff" },
        }

        vim.api.nvim_create_autocmd({ "BufWritePost" }, {
          callback = function()
            lint.try_lint()
          end,
        })
      end,
    },
  },
  config = function()
    local set_mappings = require "plugins.utils.mappings"
    local capabilities = require("cmp_nvim_lsp").default_capabilities()

    local pdflatex_args = { "-auxdir=aux", "-pdf", "-interaction=nonstopmode", "-synctex=1", "%f" }
    local lualatex_args = { "-auxdir=aux", "-pdflua", "-interaction=nonstopmode", "-synctex=1", "%f" }

    vim.lsp.config("*", {
      capabilities = capabilities,
    })

    vim.api.nvim_create_autocmd("LspAttach", {
      callback = function(args)
        local client = vim.lsp.get_client_by_id(args.data.client_id)
        local bufnr = args.buf
        if not client then
          return
        end

        set_mappings(client, bufnr)

        if client.name == "texlab" then
          local id = nil
          vim.bo[bufnr].textwidth = 80
          vim.api.nvim_buf_create_user_command(bufnr, "EnableForwardSearch", function()
            if id == nil then
              id = vim.api.nvim_create_autocmd("CursorMoved", {
                buffer = bufnr,
                desc = "Forward search",
                callback = function()
                  vim.cmd "LspTexlabForward"
                end,
              })
            end
          end, { desc = "Enable forward search" })
          vim.api.nvim_buf_create_user_command(bufnr, "DisableForwardSearch", function()
            if id ~= nil then
              vim.api.nvim_del_autocmd(id)
              id = nil
            end
          end, { desc = "Disable forward search" })
          vim.api.nvim_buf_create_user_command(bufnr, "UseLuaLatex", function()
            vim.lsp.config("texlab", { settings = { texlab = { build = { args = lualatex_args } } } })
            vim.cmd "LspRestart texlab"
          end, {})
          vim.api.nvim_buf_create_user_command(bufnr, "UsePdfLatex", function()
            vim.lsp.config("texlab", { settings = { texlab = { build = { args = pdflatex_args } } } })
            vim.cmd "LspRestart texlab"
          end, {})
        end
      end,
    })

    vim.lsp.config("pylsp", {
      on_init = function(client)
        local venv_names = { ".venv", "venv" }
        local venv_dir = nil
        for _, name in ipairs(venv_names) do
          local parent = vim.fs.root(0, { name })
          if parent ~= nil then
            venv_dir = parent .. "/" .. name
            break
          end
        end
        if venv_dir ~= nil then
          client.config.settings.pylsp = { plugins = { jedi = { environment = venv_dir } } }
          client.notify("workspace/didChangeConfiguration", { settings = client.config.settings })
        end
      end,
      settings = { pylsp = {} },
    })

    vim.lsp.config("lua_ls", {
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
    })

    vim.lsp.config("texlab", {
      settings = {
        texlab = {
          build = {
            onSave = true,
            args = { "-auxdir=aux", "-pdf", "-interaction=nonstopmode", "-synctex=1", "%f" },
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
    })

    vim.lsp.enable {
      "html",
      "cssls",
      "ts_ls",
      "jsonls",
      "tailwindcss",
      "bashls",
      "fish_lsp",
      "lua_ls",
      "pylsp",
      "texlab",
      "ocamllsp",
    }
  end,
  lazy = false,
}

return M
