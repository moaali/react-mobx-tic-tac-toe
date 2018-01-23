/**
 * ====================
 * Loading Dependencies
 * ====================
 */

const
  path    = require('path'),
  rules   = require('./rules'),
  plugins = require('./plugins');


/**
 * =================
 * Localhost Configs
 * =================
 */

const
  HOST   = process.env.HOST || "127.0.0.1",
  PORT   = process.env.PORT || "8008";


/**
 * ===================
 * Development Configs
 * ===================
 */

const
  config = {
    output: {
      publicPath : '',
      path       : path.join(__dirname, '../build'),
    },

    plugins: [
      ...(plugins.internal),
      plugins.html,
      plugins.dashboard
    ],

    devServer: {
      contentBase: './build',
      noInfo: true,
      hot: true,
      inline: true,
      historyApiFallback: true,
      port: PORT,
      host: HOST
    },
  }


/**
 * =================
 * Exporting Configs
 * =================
 */

module.exports = config
