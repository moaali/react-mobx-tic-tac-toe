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
 * ==============
 * Common Configs
 * ==============
 */

const
  config = {
    entry: [
      'react-hot-loader/patch',
      './src/index.jsx'
    ],

    output: {
      filename   : 'bundle.js'
    },

    resolve: {
      extensions: ['.js', '.jsx']
    },

    module: {
      rules: [
        rules.images,
        rules.js,
        rules.sass,
      ]
    }
  }


/**
 * =================
 * Exporting Configs
 * =================
 */

module.exports = config
