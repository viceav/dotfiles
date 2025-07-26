local M = {
  "neovim/nvim-lspconfig",
  dependencies = {
    "nvim-cmp",
    {
      "mfussenegger/nvim-lint",
      config = function()
        local lint = require "lint"
        lint.linters_by_ft = {
          typescript = { "eslint_d" },
          python = { "flake8" },
        }

        vim.api.nvim_create_autocmd({ "BufWritePost" }, {
          callback = function()
            -- try_lint without arguments runs the linters defined in `linters_by_ft`
            -- for the current filetype
            lint.try_lint()
          end,
        })
      end,
    },
  },
  config = function()
    local servers = {
      "html",
      "cssls",
      "ts_ls",
      "jsonls",
      "bashls",
      "tailwindcss",
      "rust_analyzer",
      "dockerls",
    }

    local pylspSettings = function()
      local parent = vim.fs.root(0, { "venv" })
      if parent ~= nil then
        return {
          pylsp = {
            plugins = {
              jedi = {
                environment = parent .. "/venv",
              },
            },
          },
        }
      else
        return {}
      end
    end

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

    lspconfig.pylsp.setup {
      capabilities = capabilities,
      on_attach = function(client, bufnr)
        set_mappings(client, bufnr)
        vim.api.nvim_buf_set_keymap(
          bufnr,
          "i",
          "<M-CR>",
          "<cmd>:w<CR><cmd>TermExec cmd='clear' direction=horizontal<CR><cmd>TermExec cmd='./%'<CR>",
          {}
        )
        vim.api.nvim_buf_set_keymap(
          bufnr,
          "n",
          "<M-CR>",
          "<cmd>:w<CR><cmd>TermExec cmd='clear' direction=horizontal<CR><cmd>TermExec cmd='./%'<CR>",
          {}
        )
      end,
      settings = pylspSettings(),
    }

    lspconfig.lua_ls.setup {
      on_attach = function(client, bufnr)
        set_mappings(client, bufnr)
      end,
      capabilities = capabilities,
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

      lspconfig.tinymist.setup {
        settings = {
          formatterMode = "typstyle",
          exportPdf = "onType",
          semanticTokens = "disable",
        },
        capabilities = capabilities,
        on_attach = function(client, bufnr)
          set_mappings(client, bufnr)

          local pid = nil
          -- Function to handle the exit of the process
          local on_exit = function(obj)
            pid = nil
          end

          vim.api.nvim_buf_create_user_command(bufnr, "OpenPdf", function()
            -- We only want to open the PDF if it is not already opened
            if pid == nil then
              local file = vim.fn.expand "%:r"
              local pdf = file .. ".pdf"
              pid = vim.system({ "zathura", pdf }, { text = false }, on_exit).pid
            else
              vim.api.nvim_echo({ { "File already opened" } }, false, {})
            end
          end, {})
        end,
      },
    }
  end,
  event = "BufRead",
}

return M
