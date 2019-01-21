const path = require('path')

module.exports = {
  entry: './src/__example__/index.js',
  output: {
    path: path.resolve(__dirname, './tmp/'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './src'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      /** images and fonts */
      { test: /\.(gif|ttf|eot|svg|woff2?)$/, loader: 'url-loader?name=[name].[ext]' }
    ]
  }
}