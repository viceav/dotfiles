local set_mappings = require "plugins.utils.mappings"

local M = {
  "mfussenegger/nvim-jdtls",
  ft = "java",
  dependencies = "mfussenegger/nvim-dap",
  config = function()
    local packages_location = vim.fn.stdpath "data" .. "/mason/packages/"
    local bundles = {
      vim.fn.glob(
        packages_location .. "java-debug-adapter/extension/server/com.microsoft.java.debug.plugin-*.jar",
        true
      ),
    }

    local config = {
      -- See: https://github.com/eclipse/eclipse.jdt.ls#running-from-the-command-line
      cmd = {

        -- 💀
        "/usr/bin/java", -- or '/path/to/java17_or_newer/bin/java'
        -- depends on if `java` is in your $PATH env variable and if it points to the right version.

        "-Declipse.application=org.eclipse.jdt.ls.core.id1",
        "-Dosgi.bundles.defaultStartLevel=4",
        "-Declipse.product=org.eclipse.jdt.ls.core.product",
        "-Dlog.protocol=true",
        "-Dlog.level=ALL",
        "-Xmx1g",
        "--add-modules=ALL-SYSTEM",
        "--add-opens",
        "java.base/java.util=ALL-UNNAMED",
        "--add-opens",
        "java.base/java.lang=ALL-UNNAMED",

        -- 💀
        "-jar",
        vim.fn.glob(packages_location .. "jdtls/plugins/org.eclipse.equinox.launcher_*.jar", true),

        -- "/path/to/jdtls_install_location/plugins/org.eclipse.equinox.launcher_VERSION_NUMBER.jar",
        -- ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^                                       ^^^^^^^^^^^^^^
        -- Must point to the                                                     Change this to
        -- eclipse.jdt.ls installation                                           the actual version

        -- 💀
        "-configuration",
        packages_location .. "jdtls/config_linux",
        -- "/path/to/jdtls_install_location/config_SYSTEM",
        -- ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^        ^^^^^^
        -- Must point to the                      Change to one of `linux`, `win` or `mac`
        -- eclipse.jdt.ls installation            Depending on your system.

        -- 💀
        -- See `data directory configuration` section in the README
        "-data",
        -- "/path/to/unique/per/project/workspace/folder",
        vim.fn.getcwd() .. "/..",
      },

      -- 💀
      -- This is the default if not provided, you can remove it. Or adjust as needed.
      -- One dedicated LSP server & client will be started per unique root_dir
      --
      -- vim.fs.root requires Neovim 0.10.
      -- If you're using an earlier version, use: require('jdtls.setup').find_root({'.git', 'mvnw', 'gradlew'}),
      root_dir = vim.fs.root(0, { ".git", "mvnw", "gradlew" }),

      on_attach = function(client, bufnr)
        set_mappings(client, bufnr)
      end,

      -- Here you can configure eclipse.jdt.ls specific settings
      -- See https://github.com/eclipse/eclipse.jdt.ls/wiki/Running-the-JAVA-LS-server-from-the-command-line#initialize-request
      -- for a list of options
      settings = {
        java = {},
      },

      -- Language server `initializationOptions`
      -- You need to extend the `bundles` with paths to jar files
      -- if you want to use additional eclipse.jdt.ls plugins.
      --
      -- See https://github.com/mfussenegger/nvim-jdtls#java-debug-installation
      --
      -- If you don't plan on using the debugger or other eclipse.jdt.ls plugins you can remove this
      init_options = {
        bundles = vim.list_extend(
          bundles,
          vim.fn.glob(packages_location .. "java-test/extension/server/*.jar", true, true)
        ),
      },
    }
    -- This starts a new client & server,
    -- or attaches to an existing client & server depending on the `root_dir`.
    vim.api.nvim_create_autocmd({ "FileType" }, {
      pattern = "java",
      callback = function()
        require("jdtls").start_or_attach(config)
      end,
    })
  end,
}

return M
