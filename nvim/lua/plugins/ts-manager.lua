local M = {
  "romus204/tree-sitter-manager.nvim",
  -- It seems that Markview should be loaded before nvim-treesitter
  -- https://github.com/OXY2DEV/markview.nvim?tab=readme-ov-file#-installation
  dependencies = { "OXY2DEV/markview.nvim" },
  opts = {
    auto_install = true,
    border = "rounded",
  },
  event = "BufRead",
}

return M
