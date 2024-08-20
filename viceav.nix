{ config, lib, pkgs, ... }:

{
	users.users.viceav = {
    shell = pkgs.fish;
		packages = with pkgs; [
			ags
			playerctl	
			mako
			spotify
			zoom-us
			mako
			wofi
			zathura
			tree-sitter
			nodejs_22
      wl-clipboard
      ripgrep
      coursier
      qemu
      jdk
      starship
      telegram-desktop
      discord

      # Lua
      lua-language-server
      stylua

      # Web dev stuff
      nodePackages.typescript-language-server
      nodePackages.live-server
      

      vscode-langservers-extracted
      deno
      eslint_d

      # C/Cpp
      clang-tools
      gcc
		];
	};

	services = {
    gvfs.enable = true;
    printing.drivers = with pkgs;[ hplip ];
  };

	nixpkgs.config.allowUnfreePredicate = pkg: builtins.elem (lib.getName pkg) [
		"zoom"
		"spotify"
		"steam-original"
		"steam"
		"steam-run"
    "discord"
	];

	programs = {
    fish = {
      enable = true;
    };
    steam.enable = true;
  };

	fonts.packages = with pkgs; [
		liberation_ttf
	];
}
