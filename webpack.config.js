const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
   entry: './main.js',
   output: {
      path: path.join(__dirname, '/public'),
      filename: 'index.js'
   },
   devServer: {
      inline: true,
      port: 8080,
      historyApiFallback: true,
      contentBase: './',
      hot: true
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './index.html'
      })
   ]
}