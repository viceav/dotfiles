local telescope = require "telescope"
telescope.load_extension "dap"
local map = vim.keymap.set

map({ "n", "v" }, "<leader>dl", function()
  telescope.extensions.dap.list_breakpoints {}
end)
map({ "n", "v" }, "<leader>dv", function()
  telescope.extensions.dap.variables {}
end)
map({ "n", "v" }, "<leader>df", function()
  telescope.extensions.dap.frames {}
end)
map({ "n", "v" }, "<leader>dd", function()
  telescope.extensions.dap.commands {}
end)
