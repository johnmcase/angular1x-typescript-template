const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = (env) => {
  return webpackMerge.smart(baseConfig, {
    devtool: 'cheap-module-source-map',
    module: {
      rules: [{
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          formatter: 'vso'
        }
      }]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          screw_ie8: true
        },
        comments: false,
        sourceMap: true
      })
    ]
  });
}
