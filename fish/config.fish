starship init fish | source
zoxide init fish | source

set -x CHROOT ~/.chroot
set -x PF_INFO "ascii title os kernel uptime pkgs memory"
set -U fish_greeting

if status is-login
    if test (tty) = /dev/tty1
        brightnessctl set 100%
        exec Hyprland
    end
end
