local M = {
  "NvChad/nvim-colorizer.lua",
  ft = { "css", "html", "js" },
  opts = {
    filetypes = { "*" },
    user_default_options = {
      RGB = true,
      RRGGBB = true,
      names = true,
      RRGGBBAA = false,
      AARRGGBB = false,
      rgb_fn = true,
      hsl_fn = false,
      css = false,
      css_fn = false,
      mode = "background",
      tailwind = true,
      sass = { enable = false, parsers = { "css" } },
      virtualtext = "■",
      virtualtext_inline = false,
      virtualtext_mode = "foreground",
      always_update = false,
    },
    buftypes = {},
    user_commands = true,
  },
}

return M
