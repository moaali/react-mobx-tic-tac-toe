module.exports = {
  test    : /\.(jpe?g|png|gif|svg)$/i,
  exclude : /(node_modules|build|dist\/)/,
  use     : ['file-loader']
}
