local g = vim.g
local o = vim.o
local wo = vim.wo
local map = vim.keymap.set
local delmap = vim.keymap.del

require "config.lazy"
vim.cmd "colorscheme tokyonight"

g.loaded_netrw = 1
g.loaded_netrwPlugin = 1
g.loaded_python3_provider = 0
g.loaded_node_provider = 0
g.loaded_perl_provider = 0
g.loaded_ruby_provider = 0

o.ignorecase = true
o.smartcase = true
o.cursorline = true
o.cursorlineopt = "both"
o.mouse = ""

wo.foldmethod = "expr"
wo.foldexpr = "v:lua.vim.treesitter.foldexpr()"

o.relativenumber = true
o.number = true
o.tabstop = 2
o.shiftwidth = 2
o.expandtab = true
o.smartindent = true
o.scrolloff = 5

map({ "n", "v" }, "<C-h>", "<C-W>h", { desc = "Go to Left Window" })
map({ "n", "v" }, "<C-l>", "<C-W>l", { desc = "Go to Right Window" })
map({ "n", "v" }, "<C-j>", "<C-W>j", { desc = "Go to the Down Window" })
map({ "n", "v" }, "<C-k>", "<C-W>k", { desc = "Go to the Up Window" })
map({ "n" }, "<ESC>", "<cmd>noh<CR>", { desc = "Clear Highlights" })
map({ "n", "v" }, ";", ":", { desc = "Command Mode" })

-- Clipboard
map({ "v" }, "<C-c>", '"+y', { desc = "Copy to System Clipboard" })
map({ "i" }, "<C-v>", "<C-r>+", { desc = "Paste from System Clipboard" })

-- Delete Default LSP Keymaps
delmap({ "n" }, "grn")
delmap({ "n", "v" }, "gra")
delmap({ "n" }, "grr")
delmap({ "n" }, "gri")
delmap({ "n" }, "gO")

vim.diagnostic.config { underline = true, signs = false, float = { border = "rounded" }, virtual_text = true }

vim.api.nvim_create_autocmd("BufWinEnter", {
  pattern = { "*.txt", "*.md" },
  callback = function()
    if o.buftype == "help" then
      vim.cmd "wincmd J"
    end
  end,
})
