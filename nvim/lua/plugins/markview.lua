local M = {
  "OXY2DEV/markview.nvim",
  dependencies = {
    "nvim-tree/nvim-web-devicons",
    {
      "3rd/image.nvim",
      build = false,
      pin = true,
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
  opts = {
    typst = {
      enable = false,
    },
  },
}

return M
