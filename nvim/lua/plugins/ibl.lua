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
    }

    return opts
  end,
  event = "BufEnter",
}

return M
