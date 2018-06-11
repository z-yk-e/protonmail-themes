require('dotenv').config()
const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const setEntryPoints = (themes = {}) => {
  fs.readdirSync(path.join(__dirname, 'templates')).forEach(file => {
    themes[file.slice(0, -5)] = path.join(__dirname, 'src', file)
  })
  return themes
}

const themes = setEntryPoints();

module.exports = {
  mode: process.env.MODE,
  entry: themes,
  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'themes')
  },
  module: {
  // Add loader
  rules: [{
      test: /\.(scss)$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader', 'sass-loader'
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    })
  ],
};
