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
    local actions = require "telescope.actions"
    local state = require "telescope.actions.state"

    local opts = {
      pickers = {
        colorscheme = {
          mappings = {
            i = {
              ["<CR>"] = function(prompt_bufnr)
                local selection = state.get_selected_entry()
                if selection then
                  vim.fn.jobstart(
                    [[sed -i "s/colorscheme .*\"/colorscheme ]]
                      .. selection.value
                      .. [[\"/" ]]
                      .. vim.env.HOME
                      .. [[/.config/nvim/init.lua]]
                  )
                  actions.select_default()
                end
              end,
            },
          },
        },
      },
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
