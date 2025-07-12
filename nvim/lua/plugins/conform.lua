local M = {
  "stevearc/conform.nvim",
  opts = function()
    local opts = {
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
        typescriptreact = { "prettier" },
      },

      formatters = {
        sql_formatter = {
          prepend_args = { "-c", "/home/viceav/.config/formatters/sql/sql.json" },
        },

        cbfmt = {
          prepend_args = { "--config", "/home/viceav/.config/formatters/cbfmt/config.toml" },
        },
      },

      format_on_save = function(bufnr)
        -- Disable with a buffer-local variable
        if vim.b[bufnr].disable_autoformat then
          return
        end
        return { lsp_fallback = true }
      end,
    }

    vim.api.nvim_create_user_command("FormatDisable", function()
      vim.b.disable_autoformat = true
    end, {
      desc = "Disable autoformat-on-save",
    })

    vim.api.nvim_create_user_command("FormatEnable", function()
      vim.b.disable_autoformat = false
    end, {
      desc = "Re-enable autoformat-on-save",
    })

    return opts
  end,
  event = "BufRead",
}

return M
