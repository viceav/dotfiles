local telescope = require "telescope"
telescope.load_extension "dap"
local map = vim.keymap.set

local function opts(desc, bufnr)
  return { buffer = bufnr, desc = "DAP " .. desc }
end

map({ "n", "v" }, "<leader>dl", function()
  telescope.extensions.dap.list_breakpoints {}
end, opts "List Breakpoints")
map({ "n", "v" }, "<leader>dv", function()
  telescope.extensions.dap.variables {}
end, opts "List Variables")
map({ "n", "v" }, "<leader>df", function()
  telescope.extensions.dap.frames {}
end, opts "List Frames")
map({ "n", "v" }, "<leader>dd", function()
  telescope.extensions.dap.commands {}
end, opts "Commands")
