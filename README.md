![Desktop](docs/desktop.png)

# Rename directory
```bash
cd $HOME && mv dotfiles .config && cd .config
```

# Move .gitconfig
```bash 
mv .gitconfig $HOME
```

# Install NvChad and set up custom directory
```bash
git clone https://github.com/NvChad/NvChad $HOME/.config/nvim --depth 1 &&  ln -s $HOME/.config/custom $HOME/.config/nvim/lua && nvim
```

# Set up packages.hook
```bash
sudo mkdir -p /etc/pacman.d/hooks && sudo ln -s $HOME/.config/packages.hook /etc/pacman.d/hooks/packages.hook
```
