function nvim
  hyprctl --quiet dispatch fullscreenstate 3
  command nvim $argv
  hyprctl --quiet dispatch fullscreenstate 0
end
