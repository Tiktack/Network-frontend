/* eslint-disable no-param-reassign */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const lessToJs = require('less-vars-to-js');

const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/public/ant-theme-vars.less'), 'utf8'));

module.exports = () => ({
  entry: { app: './src/index.js' },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './build'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['eslint-loader']
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: themeVariables
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // Hot reloading or u can use --hot in scripts when starting webpack
    new webpack.HotModuleReplacementPlugin(),
    // Creating index.html when build for production
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/public/index.html'
    })
  ],
  devServer: {
    overlay: true,
    hot: true,
    historyApiFallback: true,
    port: 4005,
    host: '0.0.0.0'
  },
  node: {
    process: true
  }
});
