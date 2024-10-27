local map = vim.keymap.set

local M = {
  "akinsho/bufferline.nvim",
  event = "BufNew",
  opts = function()
    local opts = {
      options = {
        mode = "buffers",
        offsets = {
          {
            filetype = "NvimTree",
            text = function()
              return vim.fn.getcwd()
            end,
            separator = false,
          },
        },
        separator_style = "slope",
      },
    }

    -- Mappings
    map({ "n" }, "<Tab>", "<cmd>BufferLineCycleNext<CR>")
    map({ "n" }, "<S-Tab>", "<cmd>BufferLineCyclePrev<CR>")
    return opts
  end,
}

return M
