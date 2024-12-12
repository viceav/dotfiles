local M = {
  "nvim-lualine/lualine.nvim",
  dependencies = { "nvim-tree/nvim-web-devicons" },
  opts = function()
    local date = function()
      return os.date "%H:%M"
    end

    local opts = {
      options = {
        theme = "onedark",
        globalstatus = true,
        section_separators = { left = "", right = "" },
        component_separators = { left = "", right = "" },
      },
      sections = {
        lualine_z = { date },
      },
    }
    return opts
  end,
}

return M
