const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
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
      }
    ]
  },
  plugins: [
    // Hot reloading or u can use --hot in scripts when starting webpack
    new webpack.HotModuleReplacementPlugin(),
    // Creating index.html when build for production
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html'
    })
  ],
  devServer: {
    overlay: true,
    hot: true,
    historyApiFallback: true,
    port: 4005,
    host: '0.0.0.0'
  }
};
