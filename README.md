![Desktop](docs/desktop.png)

# Move .gitconfig
```bash 
mv .gitconfig $HOME
```

# Install NvChad and set up custom directory
```bash
git clone https://github.com/NvChad/NvChad ~/.config/nvim --depth 1 &&  ln -s $HOME/.config/custom/ $HOME/.config/nvim/lua/ && nvim
```
