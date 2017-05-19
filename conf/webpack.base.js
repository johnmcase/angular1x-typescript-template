const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MergeJsonWebpackPlugin = require("merge-jsons-webpack-plugin")

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './src/index.ts',
    './src/css/main.scss'
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: false,
    port: 3000,
    historyApiFallback: {
      index: '/'
    }
  },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      enforce: 'pre',
      loader: 'tslint-loader',
      options: {
        formatter: 'codeFrame'
      }
    }, {
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: ['ng-annotate-loader', 'ts-loader']
    }, {
      test: /\.scss$/,
      enforce: 'pre',
      use: ['import-glob-loader']
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader', 'postcss-loader'],
      })
    }, {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
      }],
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        }
      ]
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: [
        { loader: 'file-loader' }
      ]
    }]
  },
  resolve: {
    extensions: ['.ts', '.js', '.scss', '.css']
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      options: {
        postcss: [
          autoprefixer
        ],
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true
    }),
    new webpack.ProvidePlugin({
      // Bootstrap requires JQuery and Tether be globally available
      'Tether': 'tether',
      $: "jquery",
      jQuery: "jquery",
      'window.jQuery': 'jquery'
    }),
    new CopyWebpackPlugin([
      { from: 'static/', to: '.' }
    ]),
    new MergeJsonWebpackPlugin({
      output: {
        groupBy: [
          {pattern: 'src/**/en.json', fileName: './dist/en.json'},
          {pattern: 'src/**/fr.json', fileName: './dist/fr.json'}
        ]
      }
    })
  ]
}
