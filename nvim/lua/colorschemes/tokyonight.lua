local M = {
  "folke/tokyonight.nvim",
  dependencies = "lualine.nvim",
  opts = {
    style = "night",
    styles = {
      comments = { italic = true },
      functions = { italic = true, bold = true },
      variables = { bold = true },
    },
    on_highlights = function(hl, c)
      hl.TelescopeSelection = { link = "CursorLine" }
    end,
  },
  priority = 1000,
}

return M
