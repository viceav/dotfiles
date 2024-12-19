local g = vim.g
local o = vim.o
local wo = vim.wo
local map = vim.keymap.set

require "config.lazy"
require("onedark").load()

g.loaded_netrw = 1
g.loaded_netrwPlugin = 1

o.ignorecase = true
o.smartcase = true
o.cursorline = true

wo.foldmethod = "expr"
wo.foldexpr = "v:lua.vim.treesitter.foldexpr()"

o.relativenumber = true
o.number = true
o.tabstop = 2
o.shiftwidth = 2
o.expandtab = true
o.smartindent = true
o.scrolloff = 999

map({ "n", "v" }, "<C-h>", "<C-W>h", {})
map({ "n", "v" }, "<C-l>", "<C-W>l", {})
map({ "n", "v" }, "<C-j>", "<C-W>j", {})
map({ "n", "v" }, "<C-k>", "<C-W>k", {})
map({ "n" }, "<ESC>", "<cmd>noh<CR>", {})
map({ "n", "v" }, ";", ":", {})

-- Clipboard
map({ "v" }, "<C-c>", '"+y', {})
map({ "n", "v", "i" }, "<C-v>", '"+p', {})

vim.diagnostic.config {
  underline = true,
  signs = false,
  float = { border = "rounded" },
}

vim.api.nvim_create_autocmd("BufWinEnter", {
  pattern = { "*.txt" },
  callback = function()
    if o.buftype == "help" then
      vim.cmd "wincmd J"
    end
  end,
})

vim.lsp.handlers["textDocument/hover"] =
  vim.lsp.with(vim.lsp.handlers.hover, { border = "rounded", width = math.floor(o.columns * 0.5) })
vim.lsp.handlers["textDocument/signatureHelp"] =
  vim.lsp.with(vim.lsp.handlers.signature_help, { border = "rounded", width = math.floor(o.columns * 0.5) })
