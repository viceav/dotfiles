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
