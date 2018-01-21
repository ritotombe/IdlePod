const path = require('path');

const isProd = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() == 'production';
const webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var commonPlugin = [
  new HtmlWebpackPlugin({
    title: "IdlePod",
    template: "index.html"
    
  }),
  new ExtractTextPlugin('style.bundle.css'),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }),
]

var prodPlugin = [
  new webpack.optimize.UglifyJsPlugin(),
  new webpack.optimize.AggressiveMergingPlugin(),
]

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: isProd ? 'cheap-module-source-map': 'eval',
  module: {
    rules: [{
      test:/\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    },
    {
      test:/\.css$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use:'css-loader',
      })
    }]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json', '.css']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: isProd ? commonPlugin.concat(prodPlugin) : commonPlugin
};
