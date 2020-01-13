const path = require('path');

module.exports = {
  entry: {
    'typingtest': './client/typingtest',
    'homepage': './client/homepage'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './public/')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$|\.js?$/,
        exclude: '/node_module/',
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
    ]
  }
}