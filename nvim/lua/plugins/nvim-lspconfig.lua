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

    vim.lsp.config("*", {
      capabilities = capabilities,
    })

    vim.api.nvim_create_autocmd("LspAttach", {
      callback = function(args)
        local client = vim.lsp.get_client_by_id(args.data.client_id)
        if not client then
          return
        end

        set_mappings(client, args.buf)

        if client.name == "tinymist" then
          local pid = nil
          -- Function to handle the exit of the process
          local on_exit = function(obj)
            pid = nil
          end

          vim.api.nvim_buf_create_user_command(args.buf, "OpenPdf", function()
            -- We only want to open the PDF if it is not already opened
            if pid == nil then
              local file = vim.fn.expand "%:r"
              local pdf = file .. ".pdf"
              pid = vim.system({ "zathura", pdf }, { text = false }, on_exit).pid
            else
              vim.api.nvim_echo({ { "File already opened" } }, false, {})
            end
          end, {})
        elseif client.name == "texlab" then
          local id = nil
          vim.api.nvim_buf_create_user_command(args.buf, "EnableForwardSearch", function()
            if id == nil then
              id = vim.api.nvim_create_autocmd("CursorMoved", {
                buffer = args.buf,
                desc = "Forward search",
                callback = function()
                  vim.cmd "LspTexlabForward"
                end,
              })
            end
          end, { desc = "Enable forward search" })
          vim.api.nvim_buf_create_user_command(args.buf, "DisableForwardSearch", function()
            if id ~= nil then
              vim.api.nvim_del_autocmd(id)
              id = nil
            end
          end, { desc = "Disable forward search" })
        end
      end,
    })

    vim.lsp.config("pylsp", {
      settings = pylspSettings(),
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

    vim.lsp.config("tinymist", {
      settings = {
        formatterMode = "typstyle",
        exportPdf = "onType",
        semanticTokens = "disable",
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
      "tinymist",
      "texlab",
      "ocamllsp",
    }
  end,
  lazy = false,
}

return M
