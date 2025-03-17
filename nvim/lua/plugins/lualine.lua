local M = {
  "nvim-lualine/lualine.nvim",
  dependencies = { "nvim-tree/nvim-web-devicons" },
  opts = function()
    local opts = {
      options = {
        globalstatus = true,
        section_separators = { left = "", right = "" },
        component_separators = { left = "", right = "" },
      },
      sections = {
        lualine_x = {
          {
            "lsp_status",
            ignore_lsp = { "GitHub Copilot" },
          },
          {
            "filetype",
            separator = { left = "" },
            color = function()
              local mode = require("lualine.highlight").get_mode_suffix()
              return "lualine_b" .. mode
            end,
          },
        },
        lualine_y = {},
        lualine_z = { "os.date '%H:%M'" },
      },
    }
    return opts
  end,
}

return M
