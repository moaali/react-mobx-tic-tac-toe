const
  autoprefixer = require('autoprefixer');

const
  browsers = [
    'Android >= 4',
    'Chrome >= 35',
    'Firefox >= 31',
    'Explorer >= 10',
    'iOS >= 7',
    'Opera >= 12',
    'Safari >= 7.1',
  ];

module.exports = {
  plugins: [
    autoprefixer({ browsers: browsers })
  ]
}
