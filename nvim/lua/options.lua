require "nvchad.options"

-- add yours here!

-- local o = vim.o
-- o.cursorlineopt ='both' -- to enable cursorline!
--
local g = vim.g
local opt = vim.opt
local new_cmd = vim.api.nvim_create_user_command

g.toggle_theme_icon = ""

-- Numbers
opt.relativenumber = true

-- Cursorline
opt.cursorlineopt = "both"

-- new_cmd("Tex", function()
--   require("nvchad.term").runner {
--     pos = "sp",
--     cmd = "latexmk -auxdir=aux -pdf main.tex && evince main.pdf & latexmk -auxdir=aux -pdf -pvc main.tex",
--     id = "latex",
--   }
-- end, {})
