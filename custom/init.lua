-- local autocmd = vim.api.nvim_create_autocmd

-- Auto resize panes when resizing nvim window
-- autocmd("VimResized", {
--   pattern = "*",
--   command = "tabdo wincmd =",
-- })

local g = vim.g
local opt = vim.opt
local new_cmd = vim.api.nvim_create_user_command

g.toggle_theme_icon = ""

-- Numbers
opt.relativenumber = true

new_cmd('Tex', function ()
    require('nvterm.terminal').send('latexmk -auxdir=aux -pdf main.tex && evince main.pdf & latexmk -auxdir=aux -pdf -pvc main.tex')
    require("nvterm.terminal").toggle "horizontal"
end, {})
