const
  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = new HtmlWebpackPlugin({
  template: './src/index.html',
  files: {
    css: ['style.css'],
    js: ["bundle.js"],
  }
});
