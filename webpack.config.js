
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'david-ui.min.js',
    library: '',
    libraryTarget: 'commonjs'
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/react']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      /** images and fonts */
      { test: /\.(gif|ttf|eot|svg|woff2?)$/, loader: 'url-loader?name=[name].[ext]' }
    ]
  }
}