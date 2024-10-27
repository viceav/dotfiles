local M = {
  "navarasu/onedark.nvim",
  dependencies = "lualine.nvim",
  opts = {
    style = "dark",
    diagnostics = {
      darker = false,
    },
  },
  priority = 1000,
}

return M
