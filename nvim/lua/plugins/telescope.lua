local M = {
  "nvim-telescope/telescope.nvim",
  dependencies = "nvim-lua/plenary.nvim",
  keys = {
    { "<leader>ff", "<cmd>Telescope find_files<CR>", mode = "n", desc = "Find Files" },
    { "<leader>fw", "<cmd>Telescope live_grep<CR>", mode = "n", desc = "Live Grep" },
    {
      "<leader>ch",
      "<cmd>lua=require('telescope.builtin').colorscheme({ignore_builtins=true, enable_preview=true})<CR>",
      mode = "n",
      desc = "Change Colorscheme",
    },
  },
  opts = function()
    local opts = {
      defaults = {
        sorting_strategy = "ascending",
        layout_config = {
          prompt_position = "top",
          preview_width = 0.55,
        },
      },
    }

    return opts
  end,
}

return M
