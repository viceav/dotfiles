local dap = require "dap"
local statusline = require("nvconfig").ui.statusline
local map = vim.keymap.set

local dap_status = function()
  return dap.status()
end

if statusline.modules then
  statusline.modules.dap_status = dap_status
else
  statusline.modules = { dap_status = dap_status }
end

for i, x in pairs(statusline.order) do
  if x == "%=" then
    table.insert(statusline.order, i + 1, "dap_status")
    break
  end
end

local function opts(desc, bufnr)
  return { buffer = bufnr, desc = "DAP " .. desc }
end

map("n", "<leader>dk", function()
  dap.continue()
end, opts "Continue")
map("n", "<leader>k", function()
  dap.toggle_breakpoint()
end, opts "Toggle Breakpoint")
map("n", "<Leader>tr", function()
  dap.repl.toggle()
end, opts "Toggle Repl")

dap.configurations.scala = {
  {
    type = "scala",
    request = "launch",
    name = "RunOrTest",
    metals = {
      runType = "runOrTestFile",
    },
  },
  {
    type = "scala",
    request = "launch",
    name = "Test Target",
    metals = {
      runType = "testTarget",
    },
  },
}

dap.adapters.gdb = {
  type = "executable",
  command = "gdb",
  args = { "--quiet", "--interpreter=dap", "--eval-command", "set print pretty on" },
}

dap.configurations.c = {
  {
    name = "Launch",
    type = "gdb",
    request = "launch",
    program = function()
      return vim.fn.input("Path to executable: ", vim.fn.getcwd() .. "/", "file")
    end,
    args = function()
      return vim.fn.input "Args: "
    end,
    cwd = "${workspaceFolder}",
    stopAtBeginningOfMainSubprogram = false,
  },
}
