local M = {
  "lukas-reineke/indent-blankline.nvim",
  main = "ibl",
  opts = function()
    local highlight = {
      "CursorColumn",
      "Whitespace",
    }

    local opts = {
      indent = { highlight = highlight, char = "" },
      whitespace = {
        highlight = highlight,
        remove_blankline_trail = false,
      },
      scope = { enabled = false },
      exclude = {
        filetypes = { "dashboard" },
      },
    }

    vim.api.nvim_create_autocmd({ "InsertEnter", "BufWinLeave" }, { pattern = "*.md", command = "IBLEnable" })
    vim.api.nvim_create_autocmd({ "InsertLeave", "BufWinEnter" }, { pattern = "*.md", command = "IBLDisable" })

    return opts
  end,
  event = "BufEnter",
}

return M
