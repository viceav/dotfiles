local on_attach = require("plugins.configs.lspconfig").on_attach
local capabilities = require("plugins.configs.lspconfig").capabilities

local lspconfig = require "lspconfig"

-- if you just want default config for the servers then put them in a table
-- texlab is a lsp for latex
-- pylsp is a lsp for python
-- jsonls is a lsp for json
local servers = { "html", "cssls", "tsserver", "clangd", "texlab", "pylsp", "jsonls", "bashls"}

for _, lsp in ipairs(servers) do
  lspconfig[lsp].setup {
    on_attach = on_attach,
    capabilities = capabilities,
  }
end

-- 
-- lspconfig.pyright.setup { blabla}
