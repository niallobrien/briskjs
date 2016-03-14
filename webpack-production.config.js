require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin'),
  autoprefixer = require('autoprefixer'),
  path = require('path'),
  nodeModulesPath = path.resolve('./node_modules'),
  buildPath = path.resolve(__dirname, 'public', 'scripts'),

  mainPath = [
    path.resolve(nodeModulesPath, 'stylus-mixins', 'index.styl'),
    path.resolve(__dirname, 'assets', 'styles', 'index.styl'),
    path.resolve(__dirname, 'assets', 'scripts', 'main.js')
  ],
  config = {
    devtool: 'source-map',
    entry: mainPath,
    output: {

      // We need to give Webpack a path. It does not actually need it,
      // because files are kept in memory in webpack-dev-server, but an
      // error will occur if nothing is specified. We use the buildPath
      // as that points to where the files will eventually be bundled
      // in production
      path: buildPath,
      filename: 'main.js',

      // Everything related to Webpack should go through a build path,
      // localhost:3000/scripts. That makes proxying easier to handle
      publicPath: '/scripts/'
  },
  module: {
    loaders: [

      // I highly recommend using the babel-loader as it gives you ES6/7 syntax and JSX transpiling out of the box
      // if you want to use React for example.
      {
        test: /\.js$/,
        loader: 'babel?presets[]=es2015',
        exclude: [ nodeModulesPath ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!stylus-loader')
      }
    ]
  },
  postcss: function () {
    return [ autoprefixer({ browsers: [ 'last 4 versions' ] }) ];
  },
  plugins: [
    new ExtractTextPlugin('../styles/[name].css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ]
};

module.exports = config;
