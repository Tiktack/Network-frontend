/* eslint-disable no-param-reassign */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const dotenv = require('dotenv');
const lessToJs = require('less-vars-to-js');

const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/public/ant-theme-vars.less'), 'utf8'));

module.exports = (env) => {
  const currentPath = path.join(__dirname);

  // Create the fallback path (the production .env)
  const basePath = `${currentPath}/.env`;

  // We're concatenating the environment name to our filename to specify the correct env file!
  const envPath = `${basePath}.${env.ENVIRONMENT}`;

  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  // reduce it to a nice object, the same as before (but with the variables from the file)
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});
  return {
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
      }),
      new webpack.DefinePlugin(envKeys)
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
  };
};
