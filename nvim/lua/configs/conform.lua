local options = {
  formatters_by_ft = {
    lua = { "stylua" },
    python = { "yapf", "isort" },
    javascript = { "deno_fmt" },
    json = { "deno_fmt" },
    markdown = { "deno_fmt", "cbfmt" },
    css = { "prettier" },
    html = { "prettier" },
    cpp = { "clang-format" },
    sql = { "sql_formatter" },
  },

  formatters = {
    sql_formatter = {
      prepend_args = { "-c", '{"keywordCase": "upper"}' },
    },

    cbfmt = {
      prepend_args = { "--config", "/home/viceav/.config/cbfmt/config.toml" },
    },
  },

  format_on_save = {
    -- These options will be passed to conform.format()
    lsp_fallback = true,
  },
}

return options
