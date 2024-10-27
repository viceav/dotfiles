local M = {
  "nvim-tree/nvim-tree.lua",
  dependencies = "nvim-tree/nvim-web-devicons",
  opts = {
    sort = {
      sorter = "case_sensitive",
    },
    view = {
      width = 30,
    },
    renderer = {
      group_empty = true,
      icons = {
        web_devicons = {
          file = { enable = true, color = true },
        },
      },
    },
    filters = {
      dotfiles = true,
    },
  },
  keys = {
    { "<C-n>", "<cmd>NvimTreeToggle<CR>", mode = "n" },
    { "<leader>e", "<cmd>NvimTreeFocus<CR>", mode = "n" },
  },
}

return M
