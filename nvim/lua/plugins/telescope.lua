local M = {
  "nvim-telescope/telescope.nvim",
  dependencies = "nvim-lua/plenary.nvim",
  keys = {
    { "<leader>ff", "<cmd>Telescope find_files<CR>", mode = "n" },
    { "<leader>fw", "<cmd>Telescope live_grep<CR>", mode = "n" },
  },
}

return M
