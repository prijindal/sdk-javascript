var
  webpack = require('webpack'),
  path = require('path'),
  version = require('./package.json').version;

module.exports = {
  entry: './src/Kuzzle.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'kuzzle.js',
    library: 'Kuzzle',
    libraryTarget: 'umd'
  },
  watch: false,
  mode: 'production',
  devtool: 'source-map',
  node: {
    console: false,
    global: true,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        include: path.resolve(__dirname, './src/'),
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      }
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.IgnorePlugin(/ws/),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      global: 'window',
      SDKVERSION: JSON.stringify(version),
      BUILT: true
    }),
    new webpack.BannerPlugin('Kuzzle javascript SDK version ' + version)
  ],
  optimization: {
    minimize: true
  }
};
