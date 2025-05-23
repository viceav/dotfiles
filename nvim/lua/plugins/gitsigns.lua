local M = {
  "lewis6991/gitsigns.nvim",
  event = "BufWinEnter",
  opts = {
    on_attach = function(bufnr)
      vim.api.nvim_buf_set_keymap(bufnr, "n", "gsb", "<cmd>Gitsigns blame_line<CR>", { desc = "Blame Current Line" })
      vim.api.nvim_buf_set_keymap(bufnr, "n", "gsj", "<cmd>Gitsigns next_hunk<CR>", { desc = "Next Hunk" })
      vim.api.nvim_buf_set_keymap(bufnr, "n", "gsk", "<cmd>Gitsigns prev_hunk<CR>", { desc = "Previous Hunk" })
      vim.api.nvim_buf_set_keymap(bufnr, "n", "gsv", "<cmd>Gitsigns preview_hunk<CR>", { desc = "Preview Hunk" })
      vim.api.nvim_buf_set_keymap(bufnr, "n", "gssh", "<cmd>Gitsigns stage_hunk<CR>", { desc = "Stage Hunk" })
      vim.api.nvim_buf_set_keymap(bufnr, "n", "gssb", "<cmd>Gitsigns stage_buffer<CR>", { desc = "Stage Buffer" })
      vim.api.nvim_buf_set_keymap(bufnr, "n", "gsrh", "<cmd>Gitsigns reset_hunk<CR>", { desc = "Reset Hunk" })
      vim.api.nvim_buf_set_keymap(bufnr, "n", "gsrb", "<cmd>Gitsigns reset_buffer<CR>", { desc = "Reset Buffer" })
    end,
    signs_staged_enable = false,
    signcolumn = false, -- Toggle with `:Gitsigns toggle_signs`
    numhl = true, -- Toggle with `:Gitsigns toggle_numhl`
    linehl = false, -- Toggle with `:Gitsigns toggle_linehl`
    word_diff = false, -- Toggle with `:Gitsigns toggle_word_diff`
    watch_gitdir = {
      follow_files = true,
    },
    auto_attach = true,
    attach_to_untracked = false,
    current_line_blame = false, -- Toggle with `:Gitsigns toggle_current_line_blame`
    current_line_blame_opts = {
      virt_text = true,
      virt_text_pos = "eol", -- 'eol' | 'overlay' | 'right_align'
      delay = 1000,
      ignore_whitespace = false,
      virt_text_priority = 100,
      use_focus = true,
    },
    current_line_blame_formatter = "<author>, <author_time:%R> - <summary>",
    sign_priority = 6,
    update_debounce = 100,
    status_formatter = nil, -- Use default
    max_file_length = 40000, -- Disable if file is longer than this (in lines)
    preview_config = {
      -- Options passed to nvim_open_win
      border = "single",
      style = "minimal",
      relative = "cursor",
      row = 0,
      col = 1,
    },
  },
}

return M
