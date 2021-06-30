// Main imports | DON'T CHANGE
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pkg = require('./package.json');

// settings
const ENV = process.env.NODE_ENV || 'development';
const publicDist = './public';
const port = 8000;
const notifications = false;

// configuration
const plugins = [
  new MiniCssExtractPlugin({
    filename: "[name].css",
  }),
  new HtmlWebpackPlugin({
    title: pkg.displayName,
    template: './src/views/index.html'
  })
];

notifications ? plugins.push(
  new WebpackNotifierPlugin({
    title: pkg.displayName,
    alwaysNotify: true
  })) : plugins;

module.exports = {
  entry: {
    main: './src/js/app.js'
  },
  mode: ENV,
  output: {
    path: path.join(__dirname, publicDist),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.[chunk].js'
  },
  plugins,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, publicDist),
    watchContentBase: true,
    watchOptions: {
      poll: true
    },
    compress: true,
    port: port,
    host: 'localhost',
    hot: true,
    inline: true
  }
};