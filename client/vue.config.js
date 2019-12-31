const path = require("path");

module.exports = {
  outputDir: 'C:\\Users\\bkc\\projects2020\\aalinks-vue\\server\\public',

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000'
      }
    }
  },

  runtimeCompiler: true
}