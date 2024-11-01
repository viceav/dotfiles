local M = {
  "scalameta/nvim-metals",
  dependencies = {
    "nvim-lua/plenary.nvim",
  },
  ft = { "scala" },
  config = function()
    local metals_config = require("metals").bare_config()
    local map = vim.keymap.set

    metals_config.on_attach = function(_, bufnr)
      require("metals").setup_dap()

      local function opts(desc)
        return { buffer = bufnr, desc = "LSP " .. desc }
      end

      map(
        "n",
        "<leader>mt",
        "<cmd> Telescope metals commands<CR>",
        { buffer = bufnr, desc = "Telescope Metals Commands" }
      )

      map("n", "<leader>rn", vim.lsp.buf.rename, opts "Rename")
      map("n", "<leader>ca", vim.lsp.buf.code_action, opts "Code Action")
      map("n", "gD", vim.lsp.buf.declaration, opts "Go to declaration")
      map("n", "gd", vim.lsp.buf.definition, opts "Go to definition")
      map("n", "<leader>D", vim.lsp.buf.type_definition, opts "Go to type definition")
      map("n", "gi", vim.lsp.buf.implementation, opts "Go to implementation")
      map("n", "<leader>sh", vim.lsp.buf.signature_help, opts "Show signature help")
      map("n", "gr", vim.lsp.buf.references, opts "Show references")
      map("n", "<leader>wa", vim.lsp.buf.add_workspace_folder, opts "Add workspace folder")
      map("n", "<leader>wr", vim.lsp.buf.remove_workspace_folder, opts "Remove workspace folder")
      map("n", "<leader>wl", function()
        print(vim.inspect(vim.lsp.buf.list_workspace_folders()))
      end, opts "List workspace folders")
      map("n", "<leader>we", function()
        vim.diagnostic.setqflist { severity = "ERROR" }
      end, opts "Add workspace folder")
      map("n", "<leader>ww", function()
        vim.diagnostic.setqflist { severity = "WARN" }
      end, opts "Remove workspace folder")
    end
    metals_config.capabilities = require("cmp_nvim_lsp").default_capabilities()

    vim.api.nvim_create_autocmd("FileType", {
      pattern = { "scala" },
      callback = function()
        require("metals").initialize_or_attach(metals_config)
      end,
    })
  end,
}

return M
