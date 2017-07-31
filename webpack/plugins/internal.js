const
  webpack = require('webpack');

module.exports = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.HotModuleReplacementPlugin()
];
