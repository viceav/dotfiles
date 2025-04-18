local M = {
  "nvim-tree/nvim-tree.lua",
  dependencies = "nvim-web-devicons",
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
      root_folder_label = ":~:t:s?$?/..?",
    },
    filters = {
      dotfiles = true,
    },
    sync_root_with_cwd = true,
  },
  keys = {
    { "<C-n>", "<cmd>NvimTreeToggle<CR>", mode = "n", desc = "Toggle Tree" },
    { "<leader>e", "<cmd>NvimTreeFindFileToggle<CR>", mode = "n", desc = "Find File and Toggle Tree" },
  },
}

return M
