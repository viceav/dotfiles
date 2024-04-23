-- EXAMPLE
local on_attach = require("nvchad.configs.lspconfig").on_attach
local on_init = require("nvchad.configs.lspconfig").on_init
local capabilities = require("nvchad.configs.lspconfig").capabilities

local lspconfig = require "lspconfig"
-- if you just want default config for the servers then put them in a table
local servers = { "html", "cssls", "tsserver", "clangd", "pylsp", "jsonls", "bashls", "cmake" }

-- lsps with default config
for _, lsp in ipairs(servers) do
  lspconfig[lsp].setup {
    on_attach = on_attach,
    on_init = on_init,
    capabilities = capabilities,
  }
end

-- typescript
lspconfig.tsserver.setup {
  on_attach = on_attach,
  on_init = on_init,
  capabilities = capabilities,
}

-- texlab
lspconfig.texlab.setup {
  on_attach = on_attach,
  on_init = on_init,
  capabilities = capabilities,
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
    },
  },
}
