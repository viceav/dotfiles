local map = vim.keymap.set
local tl = require "telescope.builtin"

local function set_mappings(client, bufnr)
  local function opts(desc)
    return { buffer = bufnr, desc = "LSP " .. desc }
  end

  if client.supports_method "textDocument/implementation" then
    map({ "n" }, "gi", tl.lsp_implementations, opts "Go to implementation")
  end
  if client.supports_method "textDocument/declaration" then
    map({ "n" }, "gD", vim.lsp.buf.declaration, opts "Go to declaration")
  end
  if client.supports_method "textDocument/definition" then
    map({ "n" }, "gd", tl.lsp_definitions, opts "Go to definition")
  end
  if client.supports_method "textDocument/typeDefinition" then
    map({ "n" }, "<leader>D", tl.lsp_type_definitions, opts "Go to type definition")
  end
  if client.supports_method "textDocument/signatureHelp" then
    map({ "n" }, "<leader>sh", function()
      vim.lsp.buf.signature_help { border = "rounded" }
    end, opts "Show signature help")
    map({ "i" }, "<C-s>", function()
      vim.lsp.buf.signature_help { border = "rounded" }
    end, opts "Show signature help")
  end
  if client.supports_method "workspace/workspaceFolders" then
    map({ "n" }, "<leader>wa", vim.lsp.buf.add_workspace_folder, opts "Add workspace folder")
    map({ "n" }, "<leader>wr", vim.lsp.buf.remove_workspace_folder, opts "Remove workspace folder")
    map({ "n" }, "<leader>wl", function()
      print(vim.inspect(vim.lsp.buf.list_workspace_folders()))
    end, opts "List workspace folders")
  end
  if client.supports_method "textDocument/diagnostics" then
    map({ "n", "v" }, "<leader>we", function()
      vim.diagnostic.setqflist { severity = "ERROR" }
    end, opts "Show Errors")
    map({ "n", "v" }, "<leader>ww", function()
      vim.diagnostic.setqflist { severity = "WARN" }
    end, opts "Show Warnings")
  end
  if client.supports_method "textDocument/rename" then
    map({ "n" }, "<leader>rn", vim.lsp.buf.rename, opts "Rename")
  end
  if client.supports_method "textDocument/codeAction" then
    map({ "n" }, "<leader>ca", vim.lsp.buf.code_action, opts "Code Action")
  end
  if client.supports_method "textDocument/references" then
    map({ "n" }, "gr", tl.lsp_references, opts "Show references")
  end
  if client.supports_method "textDocument/hover" then
    map({ "n" }, "K", function()
      vim.lsp.buf.hover { border = "rounded" }
    end, opts "Show hover")
  end
end

return set_mappings
