/**
 * ====================
 * Loading Dependencies
 * ====================
 */

const
  webpack = require('webpack'),
  merge   = require('webpack-merge');


/**
 * ====================
 * Loading Config Parts
 * ====================
 */

const
  common = require('./webpack/common.js'),
  build  = require('./webpack/build.js'),
  dist   = require('./webpack/dist.js');


/**
 * =================
 * Defnining the ENV
 * =================
 */

const
  target = process.env.npm_lifecycle_event;


/**
 * =============
 * Basic Configs
 * =============
 */

const
  configs = {
    common : common,
    build  : build,
    dist   : dist
  };

/**
 * ===================
 * Conditional Configs
 * ===================
 *
 * Loading the right configs based on
 * the current environment.
 */

let config;

if ( target === 'prod' )
  config = merge( configs.common, configs.dist );
else
  config = merge( configs.common, configs.build );


/**
 * =================
 * Exporting Configs
 * =================
 */

module.exports = config
