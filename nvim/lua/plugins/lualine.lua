local M = {
  "nvim-lualine/lualine.nvim",
  dependencies = { "nvim-tree/nvim-web-devicons" },
  opts = {
    options = {
      theme = "onedark",
      globalstatus = true,
      section_separators = { left = "", right = "" },
      component_separators = { left = "", right = "" },
    },
  },
}

return M
