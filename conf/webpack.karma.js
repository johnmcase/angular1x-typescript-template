const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = (env) => {
  return webpackMerge.smart(baseConfig, {
    module: {
      rules: [{
        test: /\.ts(x?)$/,
        include: /src/,
        exclude: [/.spec.(js|ts)$/, /node_modules/],
        enforce: 'post',
        use: ['istanbul-instrumenter-loader']
      }]
    }
  });
}
