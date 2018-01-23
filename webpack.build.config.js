const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');


const rules = require('./webpack/commonRules.js');

const config = {
  entry: {
    app: ['babel-polyfill', './src/frontend/app.js'],
  },
  target: 'web',
  output: {
    filename: '[name]-[hash].js',
    path: path.join(__dirname, './build/assets/'),
    publicPath: './build/assets/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new AssetsPlugin({
      path: path.resolve(__dirname, './build'),
      filename: 'assets.json',
      prettyPrint: true,
    }),
    new UglifyJSPlugin({
      // beautify: true,
    }),
    new ExtractTextPlugin({
      filename: '[name]-[hash].css',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // Specify the common bundle's name.
      minChunks: module => /node_modules/.test(module.resource),
    }),
    new webpack.SourceMapDevToolPlugin(),
  ],
  module: {
    rules,
  },
};

module.exports = config;
