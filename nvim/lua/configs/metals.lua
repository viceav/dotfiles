local metals_config = require("metals").bare_config()

metals_config.on_attach = function()
  require("nvchad.configs.lspconfig").on_attach()
  require("metals").setup_dap()
end
metals_config.capabilities = require("cmp_nvim_lsp").default_capabilities()

vim.api.nvim_create_autocmd("FileType", {
  pattern = { "scala" },
  callback = function()
    require("metals").initialize_or_attach(metals_config)
  end,
})
