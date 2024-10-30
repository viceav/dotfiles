local map = vim.keymap.set

local M = {
  "akinsho/bufferline.nvim",
  event = "BufNew",
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
