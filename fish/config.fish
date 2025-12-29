source $HOME/.config/fish/env.fish
source $HOME/.local/share/nvim/lazy/tokyonight.nvim/extras/fish/tokyonight_night.fish

starship init fish | source
zoxide init fish | source

alias pacinfo "pacman -Qei | rg -U 'Name|Description|^\n'"

set -x fish_greeting
set -x SSH_AUTH_SOCK $XDG_RUNTIME_DIR/ssh-agent.socket
set -x EDITOR nvim
