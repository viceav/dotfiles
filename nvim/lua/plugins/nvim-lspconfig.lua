local servers = { "html", "cssls", "ts_ls", "clangd", "pylsp", "jsonls", "bashls", "cmake", "lua_ls" }

local M = {
  "neovim/nvim-lspconfig",
  dependencies = "nvim-cmp",
  config = function()
    local lspconfig = require "lspconfig"
    local capabilities = require("cmp_nvim_lsp").default_capabilities()

    for _, lsp in ipairs(servers) do
      lspconfig[lsp].setup {
        capabilities = capabilities,
      }
    end

    lspconfig.texlab.setup {
      capabilities = capabilities,
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
  end,

  event = "BufRead",
}

return M
