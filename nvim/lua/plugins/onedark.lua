local M = {
  "navarasu/onedark.nvim",
  dependencies = "lualine.nvim",
  opts = {
    code_style = {
      comments = "italic",
      functions = "italic,bold",
      variables = "bold",
    },
    style = "darker",
    diagnostics = {
      darker = false,
    },
  },
  priority = 1000,
}

return M
