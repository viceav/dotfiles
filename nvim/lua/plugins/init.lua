local overrides = require "configs.overrides"

---@type NvPluginSpec[]
local plugins = {

  -- Override plugin definition options

  {
    "neovim/nvim-lspconfig",
    config = function()
      require("nvchad.configs.lspconfig").defaults()
      require "configs.lspconfig"
    end, -- Override to setup mason-lspconfig
    -- init = function()
    --   local biber_bin_dir = "/usr/bin/vendor_perl"
    --   vim.env.PATH = biber_bin_dir .. ":" .. vim.env.PATH
    -- end,
  },

  -- override plugin configs
  {
    "williamboman/mason.nvim",
    opts = overrides.mason,
  },

  {
    "nvim-treesitter/nvim-treesitter",
    opts = overrides.treesitter,
  },

  {
    "nvim-tree/nvim-tree.lua",
    opts = overrides.nvimtree,
  },

  -- Install a plugin
  {
    "max397574/better-escape.nvim",
    event = "InsertEnter",
    config = function()
      require("better_escape").setup()
    end,
  },

  {
    "stevearc/conform.nvim",
    --  for users those who want auto-save conform + lazyloading!
    event = "BufWritePre",
    cmd = "ConformInfo",
    opts = require "configs.conform",
  },

  {
    "mfussenegger/nvim-lint",
    ft = { "javascript", "cpp", "python" },
    config = function()
      require "configs.lint"
    end,
  },

  {
    "scalameta/nvim-metals",
    dependencies = {
      "nvim-lua/plenary.nvim",
    },
    ft = { "scala" },
    config = function()
      require "configs.metals"
    end,
  },

  {
    "mfussenegger/nvim-dap",
    ft = { "c" },
    config = function()
      require "configs.dap"
    end,
  },
}

return plugins
