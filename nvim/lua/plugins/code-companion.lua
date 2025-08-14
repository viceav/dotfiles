local M = {
  "olimorris/codecompanion.nvim",
  dependencies = {
    {
      "github/copilot.vim",
      event = "BufRead",
      config = function()
        vim.keymap.set("i", "<M-Tab>", 'copilot#Accept("\\<CR>")', {
          expr = true,
          replace_keycodes = false,
        })
        vim.g.copilot_no_tab_map = true
      end,
    },
    "nvim-lua/plenary.nvim",
    "nvim-treesitter/nvim-treesitter",
    "hrsh7th/nvim-cmp",
    "nvim-telescope/telescope.nvim",
  },
  keys = {
    { "<leader>a", "<cmd>CodeCompanionChat Toggle<CR>", mode = { "n", "v" }, { desc = "Code Companion Chat" } },
    { "<M-a>", "<cmd>CodeCompanionActions<CR>", mode = { "n", "v" }, { desc = "Code Companion Actions" } },
  },
  opts = {
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
  },
}

return M
