local opts = {
  auto_install = true,
  ensure_installed = {
    "vim",
    "lua",
    "html",
    "css",
    "javascript",
    "typescript",
    "tsx",
    "c",
    "markdown",
    "markdown_inline",
    --
    "cpp",
    "json",
    "python",
    "latex",
    "bash",
    "cmake",
    "dockerfile",
    "sql",

    -- for code-companion
    "yaml",
  },
  indent = {
    enable = true,
  },
  highlight = { enable = true },
}

local M = {
  "nvim-treesitter/nvim-treesitter",
  main = "nvim-treesitter.configs",
  opts = opts,
  event = "BufRead",
}

return M
