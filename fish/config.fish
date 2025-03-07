starship init fish | source
zoxide init fish | source

set -x CHROOT ~/.chroot
set -U fish_greeting

if status is-login
    if test (tty) = /dev/tty1
        brightnessctl set 100%
        exec Hyprland
    end
end
