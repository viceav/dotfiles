local M = {
  "olimorris/codecompanion.nvim",
  dependencies = {
    "github/copilot.vim",
    "nvim-lua/plenary.nvim",
    "nvim-treesitter/nvim-treesitter",
    "hrsh7th/nvim-cmp",
    "nvim-telescope/telescope.nvim",
  },
  event = "BufRead",
  opts = function()
    local opts = {
      strategies = {
        chat = {
          adapter = "copilot",
        },
        inline = {
          adapter = "copilot",
        },
        agent = {
          adapter = "copilot",
        },
      },
      display = {
        chat = { show_settings = true, layout = "buffer" },
      },
    }

    vim.keymap.set("i", "<M-Tab>", 'copilot#Accept("\\<CR>")', {
      expr = true,
      replace_keycodes = false,
    })
    vim.g.copilot_no_tab_map = true

    return opts
  end,
}

return M
