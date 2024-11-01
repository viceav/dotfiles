local g = vim.g
local opt = vim.opt
local wo = vim.wo
local map = vim.keymap.set

require "config.lazy"
require("onedark").load()

g.loaded_netrw = 1
g.loaded_netrwPlugin = 1

opt.ignorecase = true
opt.smartcase = true
opt.clipboard = "unnamedplus"
opt.cursorline = true

wo.foldmethod = "expr"
wo.foldexpr = "v:lua.vim.treesitter.foldexpr()"

opt.relativenumber = true
opt.tabstop = 2
opt.shiftwidth = 2
opt.expandtab = true
opt.smartindent = true

map({ "n", "v" }, "<C-h>", "<C-W>h", {})
map({ "n", "v" }, "<C-l>", "<C-W>l", {})
map({ "n", "v" }, "<C-j>", "<C-W>j", {})
map({ "n", "v" }, "<C-k>", "<C-W>k", {})
map({ "n" }, "<ESC>", "<cmd>noh<CR>", {})
map({ "n", "v" }, ";", ":", {})
