const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ROOT = path.resolve(__dirname, '../../')

module.exports = {
  name: 'www-interweb',

  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/dev-server',
      path.resolve(ROOT, 'src/app/bootstrap.js'),
      path.resolve(ROOT, 'src/sass/template.scss')
    ]
  },

  output: {
    filename: 'js/[name].js',
    path: path.resolve(ROOT, 'dist'),
    publicPath: '/'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.js$/,
      loader: 'babel',
      include: /node_modules\/react\-icons/
    }, {
      test: /\.(gif|png|jpe?g|svg)$/i,
      exclude: /node_modules/,
      loader: 'file?name=assets/[name]_[hash].[ext]'
    }, {
      test: /\.(scss|sass|css)$/,
      loaders: ['style', 'css', 'sass'],
      include: /sass/
    }, {
      test: /\.(scss|sass|css)$/,
      loader: 'style!css?localIdentName=[local]__[path][name]__[hash:base64:5]&modules&importLoaders=1&sourceMap!sass-loader',
      exclude: /sass/
    }]
  },

  sassLoader: {
    includePaths: [path.resolve(ROOT, 'src/sass')],
    data: '@import "theme/theme";'
  },

  devServer: {
    hot: true,
    contentBase: '/',
    stats: 'errors-only',
    silent: true,
    colors: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:9090'
      }
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],

  resolve: {
    root: path.resolve(ROOT, 'src/app')
  },

  devtool: 'cheap-module-eval-source-map',
  target: 'web',
  progress: true,
  stats: false
}

