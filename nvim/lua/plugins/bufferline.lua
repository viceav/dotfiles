local map = vim.keymap.set

local M = {
  "akinsho/bufferline.nvim",
  lazy = false,
  opts = function()
    local opts = {
      options = {
        mode = "buffers",
        themable = true,
        offsets = {
          {
            filetype = "NvimTree",
            highlight = "NvimTreeNormal",
          },
        },
        separator_style = "slope",
        diagnostics = "nvim_lsp",
        custom_filter = function(buf, buf_num)
          if vim.bo[buf].buftype ~= "terminal" then
            return true
          end
        end,
      },
    }

    local bufferline = require "bufferline"

    -- Mappings
    map({ "n" }, "<Tab>", "<cmd>BufferLineCycleNext<CR>")
    map({ "n" }, "<S-Tab>", "<cmd>BufferLineCyclePrev<CR>")
    map({ "n" }, "<leader>q", function()
      local bufferToDelete = vim.api.nvim_get_current_buf()
      bufferline.cycle(-1)
      vim.cmd("bdelete " .. bufferToDelete)
    end, {})
    map({ "n" }, "<leader>Q", function()
      local bufferToDelete = vim.api.nvim_get_current_buf()
      bufferline.cycle(-1)
      vim.cmd("bdelete! " .. bufferToDelete)
    end, {})
    return opts
  end,
}

return M
