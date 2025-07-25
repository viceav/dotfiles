local M = {
  "williamboman/mason.nvim",
  opts = {
    ui = {
      icons = {
        package_installed = "✓",
        package_pending = "➜",
        package_uninstalled = "✗",
      },
    },
  },
  lazy = false,
}

local pkgs = {
  -- lua stuff
  "lua-language-server",
  "stylua",

  -- web dev stuff
  "css-lsp",
  "html-lsp",
  "typescript-language-server",
  "deno",
  "prettier",
  "eslint_d",
  "tailwindcss-language-server",

  -- python stuff
  "python-lsp-server",
  "yapf",
  "isort",
  "flake8",

  -- bash stuff
  "bash-language-server",

  -- json stuff
  "json-lsp",

  -- rust
  "rust-analyzer",
}

vim.api.nvim_create_user_command("MasonInstallAll", function()
  for _, pkg in ipairs(pkgs) do
    vim.cmd("MasonInstall " .. pkg)
  end
end, {})

return M
