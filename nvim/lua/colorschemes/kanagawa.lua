local M = {
  "rebelot/kanagawa.nvim",
  dependencies = "lualine.nvim",
  opts = {
    commentStyle = { italic = true },
    functionStyle = { italic = true, bold = true },
    keywordStyle = { bold = true },
  },
  priority = 1000,
}

return M
