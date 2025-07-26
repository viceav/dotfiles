local M = {
  "nvim-treesitter/nvim-treesitter",
  -- It seems that Markview should be loaded before nvim-treesitter
  -- https://github.com/OXY2DEV/markview.nvim?tab=readme-ov-file#-installation
  dependencies = { "OXY2DEV/markview.nvim" },
  main = "nvim-treesitter.configs",
  opts = {
    auto_install = true,
    indent = { enable = true },
    highlight = { enable = true },
  },
  event = "BufRead",
}

return M
