source $HOME/.config/fish/env.fish
source $HOME/.local/share/nvim/lazy/tokyonight.nvim/extras/fish/tokyonight_night.fish

starship init fish | source
zoxide init fish | source

alias pacinfo "pacman -Qei | rg -U 'Name|Description|^\n'"

set -x XCURSOR_PATH $HOME/.local/share/icons
set -x EDITOR nvim

set -x fish_greeting

if status is-login
    if test (tty) = /dev/tty1
        brightnessctl set 100%
        # A copy of niri-session without the SHELL part,
        # Using the original causes a loop
        exec /usr/local/bin/niri-session
    end
end
