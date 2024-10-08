local M = {}

M.treesitter = {
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
    "scala",
    "dockerfile",
    "sql",
  },
  indent = {
    enable = true,
    -- disable = {
    --   "python"
    -- },
  },
}

M.mason = {
  pkgs = {
    -- lua stuff
    "lua-language-server",
    "stylua",

    -- web dev stuff
    "css-lsp",
    "html-lsp",
    "typescript-language-server",
    "deno",
    "prettier",
    "eslint_d",

    -- c/cpp stuff
    "clangd",
    "clang-format",
    "cpplint",

    -- python stuff
    "python-lsp-server",
    "yapf",
    "isort",
    "flake8",

    -- latex stuff
    "texlab",

    -- bash stuff
    "bash-language-server",

    -- json stuff
    "json-lsp",

    --cmake stuff
    "cmake-language-server",

    --sql
    "sql-formatter",
  },
}

-- git support in nvimtree
M.nvimtree = {
  git = {
    enable = true,
  },

  renderer = {
    highlight_git = true,
    icons = {
      show = {
        git = true,
      },
    },
  },
}

return M
