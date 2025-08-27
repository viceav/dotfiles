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
    map({ "n" }, "<Tab>", "<cmd>BufferLineCycleNext<CR>", { desc = "Next Buffer" })
    map({ "n" }, "<S-Tab>", "<cmd>BufferLineCyclePrev<CR>", { desc = "Previous Buffer" })
    map({ "n" }, "<leader>q", function()
      local bufferToDelete = vim.api.nvim_get_current_buf()
      local elements = bufferline.get_elements().elements
      if bufferToDelete == elements[#elements].id then
        bufferline.cycle(-1)
      else
        bufferline.cycle(1)
      end
      vim.cmd("bdelete " .. bufferToDelete)
    end, { desc = "Quit and Save Buffer" })
    map({ "n" }, "<leader>Q", function()
      local bufferToDelete = vim.api.nvim_get_current_buf()
      local elements = bufferline.get_elements().elements
      if bufferToDelete == elements[#elements].id then
        bufferline.cycle(-1)
      else
        bufferline.cycle(1)
      end
      vim.cmd("bdelete! " .. bufferToDelete)
    end, { desc = "Quit Buffer" })
    return opts
  end,
}

return M
