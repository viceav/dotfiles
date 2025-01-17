local M = {
  "OXY2DEV/markview.nvim",
  lazy = false, -- Recommended
  -- ft = "markdown" -- If you decide to lazy-load anyway

  dependencies = {
    "nvim-treesitter/nvim-treesitter",
    "nvim-tree/nvim-web-devicons",
    {
      "3rd/image.nvim",
      build = false,
      opts = {
        backend = "kitty",
        processor = "magick_cli",
        integrations = {
          markdown = {
            enabled = true,
            clear_in_insert_mode = true,
          },
        },
        window_overlap_clear_enabled = true,
      },
    },
  },
}

return M
