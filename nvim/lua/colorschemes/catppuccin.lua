local M = {
  "catppuccin/nvim",
  dependencies = "lualine.nvim",
  name = "catppuccin",
  opts = {
    flavour = "mocha",
    styles = {
      comments = { "italic" },
      functions = { "italic", "bold" },
      variables = { "bold" },
    },
  },
  priority = 1000,
}

return M
