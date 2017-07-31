module.exports = {
  test    : /\.scss$/,
  exclude : /(node_modules|build|dist\/)/,
  use     : [
    'style-loader', {
      loader: 'css-loader',
      options: {
        importLoaders: 1
      }
    },
    'sass-loader'
  ]
}
