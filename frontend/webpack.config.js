// Webpack Config
var webpack = require('webpack');
var BabiliPlugin = require('babili-webpack-plugin');
var path = require('path');
var env = require('yargs').argv.env;
var path = require('path');

//Change this to your library name
//Also remember to change the 'main' entry point in package.json
var outputName = 'btc-graph-viz';
var outputFile = outputName + '.js';
var plugins = [];

//For build mode we output a minified file. This is what will be published to npm.
//Otherwise we can use the unminified version for development and debugging.
if(env === 'build'){
  plugins.push(new BabiliPlugin());
  // This is where we could distinguish a .min.js version for build
  // But I'm keeping both versions as .js for now for ease of development
}

//For using fetch
plugins.push(new webpack.ProvidePlugin({
    'Promise': 'es6-promise', // (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
    'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
}));

//For loading sigma plugins
plugins.push(new webpack.ProvidePlugin({
  sigma: 'sigma'
}));

//The default entry point is src/index.js
//The default output is build/btc-graph-viz.min.js or .js
var config = {
  entry: ['whatwg-fetch',path.resolve(__dirname, './src/index.js')],
  resolve: {
    alias: {
      'plugins': path.resolve(__dirname, './lib/plugins.js')
    }
  },
  devtool: 'source-map',
  node: { fs: 'empty' },
  plugins: plugins,
  target: 'web',
  output: {
    path: __dirname + '/build',
    filename: outputFile,
    library: outputName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      // {
      //   test: /sigma.*\.js?$/, // the test to only select sigma files
      //   exclude: ['src'], // you ony need to check node_modules, so remove your application files
      //   loaders: ['script'] // loading as script
      // },
      {
        test: /sigma.*\.js?$/,
        use: [{
          loader: 'imports-loader',
          options: "this=>window"
        }]
      }
    ]
  }
};

module.exports = config;
