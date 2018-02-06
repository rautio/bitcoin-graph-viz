// Webpack Config

var webpack = require('webpack');
var BabiliPlugin = require('babili-webpack-plugin');
var path = require('path');
var env = require('yargs').argv.env;

//Change this to your library name
//Also remember to change the 'main' entry point in package.json
var outputName = 'btc-graph-viz.js';
var plugins = [], outputFile;

//For build mode we output a minified file. This is what will be published to npm.
//Otherwise we can use the unminified version for development and debugging.
if(env === 'build'){
  plugins.push(new BabiliPlugin());
  // This is where we could distinguish a .min.js version for build
  // But I'm keeping both versions as .js for now for ease of development
}

//The default entry point is src/index.js
//The default output is build/btc-graph-viz.min.js or .js
var config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  plugins: plugins,
  target: 'node',
  output: {
    path: __dirname + '/build',
    filename: outputFile,
    library: outputName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = config;