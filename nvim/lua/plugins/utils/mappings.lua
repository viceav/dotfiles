local map = vim.keymap.set

local function set_mappings(client, bufnr)
  local function opts(desc)
    return { buffer = bufnr, desc = "LSP " .. desc }
  end

  if client.supports_method "textDocument/implementation" then
    map({ "n", "v" }, "gi", vim.lsp.buf.implementation, opts "Go to implementation")
  end
  if client.supports_method "textDocument/declaration" then
    map({ "n", "v" }, "gD", vim.lsp.buf.declaration, opts "Go to declaration")
  end
  if client.supports_method "textDocument/definition" then
    map({ "n", "v" }, "gd", vim.lsp.buf.definition, opts "Go to definition")
  end
  if client.supports_method "textDocument/typeDefinition" then
    map({ "n", "v" }, "<leader>D", vim.lsp.buf.type_definition, opts "Go to type definition")
  end
  if client.supports_method "textDocument/signatureHelp" then
    map({ "n", "v" }, "<leader>sh", vim.lsp.buf.signature_help, opts "Show signature help")
  end
  if client.supports_method "workspace/workspaceFolders" then
    map({ "n", "v" }, "<leader>wa", vim.lsp.buf.add_workspace_folder, opts "Add workspace folder")
    map({ "n", "v" }, "<leader>wr", vim.lsp.buf.remove_workspace_folder, opts "Remove workspace folder")
    map({ "n", "v" }, "<leader>wl", function()
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
    map({ "n", "v" }, "<leader>rn", vim.lsp.buf.rename, opts "Rename")
  end
  if client.supports_method "textDocument/codeAction" then
    map({ "n", "v" }, "<leader>ca", vim.lsp.buf.code_action, opts "Code Action")
  end
  if client.supports_method "textDocument/references" then
    map({ "n", "v" }, "gr", vim.lsp.buf.references, opts "Show references")
  end
end

return set_mappings
