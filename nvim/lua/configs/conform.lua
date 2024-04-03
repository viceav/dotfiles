local options = {
  formatters_by_ft = {
    lua = { "stylua" },
    python = { "yapf", "isort" },
    javascript = { "deno_fmt" },
    json = { "deno_fmt" },
    markdown = { "deno_fmt" },
    css = { "prettier" },
    html = { "prettier" },
    cpp = { "clang-format" },
  },

  format_on_save = {
    -- These options will be passed to conform.format()
    lsp_fallback = true,
    async = true,
  },
}

require("conform").setup(options)
