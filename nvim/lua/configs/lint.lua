local lint = require "lint"
local statusline = require("nvconfig").ui.statusline

local lint_progress = function()
  local linters = require("lint").get_running()
  if #linters == 0 then
    return ""
  end
  return "󱉶 " .. table.concat(linters, ", ")
end

if statusline.modules then
  statusline.modules.lint_progress = lint_progress
else
  statusline.modules = { lint_progress = lint_progress }
end

for i, x in pairs(statusline.order) do
  if x == "=%" then
    table.insert(statusline.order, i + 1, "lint_progress")
    break
  end
end

lint.linters_by_ft = {
  javascript = { "eslint_d" },
  cpp = { "cpplint" },
  python = { "flake8" },
}

vim.api.nvim_create_autocmd({ "BufWritePost" }, {
  callback = function()
    lint.try_lint()
  end,
})
