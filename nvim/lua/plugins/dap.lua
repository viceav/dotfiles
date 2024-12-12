-- mapping
local map = vim.keymap.set

local function opts(desc, bufnr)
  return { buffer = bufnr, desc = "dap " .. desc }
end

local pattern = { "c", "cpp", "java" }

local M = {
  "mfussenegger/nvim-dap",
  ft = { "c", "cpp" },
  dependencies = {
    {
      "nvim-telescope/telescope-dap.nvim",
      dependencies = "telescope.nvim",
      config = function()
        local telescope = require "telescope"
        telescope.load_extension "dap"

        vim.api.nvim_create_autocmd("FileType", {
          pattern = pattern,
          callback = function()
            map({ "n", "v" }, "<leader>dl", function()
              telescope.extensions.dap.list_breakpoints {}
            end, opts("list breakpoints", true))
            map({ "n", "v" }, "<leader>dv", function()
              telescope.extensions.dap.variables {}
            end, opts("list variables", true))
            map({ "n", "v" }, "<leader>df", function()
              telescope.extensions.dap.frames {}
            end, opts("list frames", true))
            map({ "n", "v" }, "<leader>dd", function()
              telescope.extensions.dap.commands {}
            end, opts("commands", true))
          end,
        })
      end,
    },
    {
      "theHamsta/nvim-dap-virtual-text",
      opts = {
        enabled_commands = true,
        -- highlight_changed_variables = true,
        highlight_new_as_changed = true,
        commented = true,
        show_stop_reason = true,
        virt_text_pos = "eol",
      },
    },
  },
  config = function()
    local dap = require "dap"

    -- Create buffer specific mappings
    vim.api.nvim_create_autocmd("FileType", {
      pattern = pattern,
      callback = function()
        map("n", "<leader>dk", function()
          dap.continue()
        end, opts("Continue", true))
        map("n", "<leader>k", function()
          dap.toggle_breakpoint()
        end, opts("Toggle Breakpoint", true))
        map("n", "<Leader>tr", function()
          dap.repl.toggle { height = math.ceil(vim.api.nvim_win_get_height(0) * 0.30) }
        end, opts("Toggle Repl", true))
      end,
    })

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

    local lualine = require "lualine"
    lualine.setup {
      sections = {
        lualine_c = {
          "filename",
          function()
            return dap.status()
          end,
        },
      },
    }
  end,
}

return M
