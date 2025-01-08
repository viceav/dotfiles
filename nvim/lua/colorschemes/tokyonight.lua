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
  },
  priority = 1000,
}

return M
