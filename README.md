![Desktop](docs/desktop.png)

# Rename directory

```bash
cd $HOME && mv dotfiles .config && cd .config
```

# Move .gitconfig

```bash
mv .gitconfig $HOME
```

# Set up packages.hook

```bash
sudo mkdir -p /etc/pacman.d/hooks && sudo ln -s $HOME/.config/packages.hook /etc/pacman.d/hooks/packages.hook
```
