local M = {
  "akinsho/toggleterm.nvim",
  opts = function()
    local opts = {
      open_mapping = [[<M-f>]],
      direction = "float",
      float_opts = {
        border = "curved",
      },
      terminal_mappings = true,
    }

    vim.keymap.set("t", "<Esc>", [[<C-\><C-n>]])

    return opts
  end,
  lazy = false,
}

return M
