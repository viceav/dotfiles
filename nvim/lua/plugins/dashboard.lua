local M = {
  "nvimdev/dashboard-nvim",
  dependencies = { "nvim-tree/nvim-web-devicons", "telescope.nvim" },
  event = "VimEnter",
  opts = function()
    local opts = {
      hide = {
        statusline = false,
      },
      config = {
        packages = { enable = false },
        project = { limit = 5 },
        mru = { limit = 5 },
        shortcut = {},
        header = {
          [[                                                              ]],
          [[                                                              ]],
          [[ ___      ___ ___  ________  _______   ________  ___      ___ ]],
          [[|\  \    /  /|\  \|\   ____\|\  ___ \ |\   __  \|\  \    /  /|]],
          [[\ \  \  /  / | \  \ \  \___|\ \   __/|\ \  \|\  \ \  \  /  / /]],
          [[ \ \  \/  / / \ \  \ \  \    \ \  \_|/_\ \   __  \ \  \/  / / ]],
          [[  \ \    / /   \ \  \ \  \____\ \  \_|\ \ \  \ \  \ \    / /  ]],
          [[   \ \__/ /     \ \__\ \_______\ \_______\ \__\ \__\ \__/ /   ]],
          [[    \|__|/       \|__|\|_______|\|_______|\|__|\|__|\|__|/    ]],
          [[                                                              ]],
          [[                                                              ]],
        },
        footer = {
          [[                                                           ]],
          [[                                                           ]],
          [[If the endless dream guides your restless spirit, seize it!]],
        },
      },
    }
    return opts
  end,
}

return M
