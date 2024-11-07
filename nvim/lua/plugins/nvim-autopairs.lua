local M = {
  "windwp/nvim-autopairs",
  event = "InsertEnter",
  config = true,
  opts = {
    fast_wrap = {
      map = "<M-e>",
      chars = { "{", "[", "(", '"', "'" },
      pattern = [=[[%'%"%>%]%)%}%,]]=],
      end_key = "$",
      before_key = "h",
      after_key = "l",
      cursor_pos_before = true,
      avoid_move_to_end = true, -- stay for direct end_key use
      keys = "qwertyuiopzxcvbnmasdfghjkl",
      manual_position = true,
      highlight = "Search",
      highlight_grey = "Comment",
    },
  },
}

return M
