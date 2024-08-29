require "nvchad.options"

-- add yours here!

-- local o = vim.o
-- o.cursorlineopt ='both' -- to enable cursorline!
--
local g = vim.g
local opt = vim.opt

g.toggle_theme_icon = ""

-- Numbers
opt.relativenumber = true

-- Cursorline
opt.cursorlineopt = "both"

-- Fold Settings
vim.wo.foldmethod = "expr"
vim.wo.foldexpr = "v:lua.vim.treesitter.foldexpr()"
vim.wo.foldminlines = 5
vim.wo.foldnestmax = 10

-- Requires npm install live-server
-- Especial use for web development
vim.api.nvim_create_user_command("LiveServer", function()
  local term = require "nvchad.term"
  term.runner { pos = "sp", id = "live-server", size = 0.4, cmd = "npm exec --no live-server" }
  term.toggle { id = "live-server" }
end, {})
