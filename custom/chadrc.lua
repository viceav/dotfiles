---@type ChadrcConfig
local M = {}

-- Path to overriding theme and highlights files
local highlights = require "custom.highlights"

M.ui = {
  theme = "onedark",
  theme_toggle = {},

  hl_override = highlights.override,
  hl_add = highlights.add,

  nvdash = {
    load_on_startup = true,
    header = {
      " ___      ___ ___  ________  _______      ",
      "|\\  \\    /  /|\\  \\|\\   ____\\|\\  ___ \\     ",
      "\\ \\  \\  /  / | \\  \\ \\  \\___|\\ \\   __/|    ",
      " \\ \\  \\/  / / \\ \\  \\ \\  \\    \\ \\  \\_|/__  ",
      "  \\ \\    / /   \\ \\  \\ \\  \\____\\ \\  \\_|\\ \\ ",
      "   \\ \\__/ /     \\ \\__\\ \\_______\\ \\_______\\",
      "    \\|__|/       \\|__|\\|_______|\\|_______|",
      "                                          ",
    }
  }
}

M.plugins = "custom.plugins"

-- check core.mappings for table structure
M.mappings = require "custom.mappings"

return M
