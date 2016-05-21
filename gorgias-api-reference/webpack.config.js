
const webpack = require('webpack');
const path = require('path');

const APP_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'static/bundle');
const __PRODUCTION__ = process.env.NODE_ENV === 'production';

const entry = [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    APP_DIR + '/App.js'
  ];
const outputDev = {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/bundle/'
  };
const outputBuild = {
    path: BUILD_DIR,
    filename: 'bundle.js'
  };
let output = outputDev;
if (__PRODUCTION__) {
    output = outputBuild;
}
const plugins = [ new webpack.HotModuleReplacementPlugin() ];
const loaders = [
    {
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: APP_DIR,
    },
    {
      test: /\.less$/,
      loader: "style!css!less"
    },
    {
      test: /\.(otf|eot|woff|woff2|ttf|svg|png|jpg)$/,
      loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
    }
];

module.exports = {
  devtool: 'eval',
  entry: entry,
  output: output,
  plugins: plugins,
  module: {
    loaders: loaders
  }
};
