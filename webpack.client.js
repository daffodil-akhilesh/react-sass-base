const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = (env) => {
  return ({
    entry: './src/index.js', // webpack starts building dependency graph from here
    mode: env.BUILD_ENV, //build environment
    output: {
      path: path.join(__dirname, "/build"), // the bundle output path
      filename: "bundle.js", // the name of the bundle,
      chunkFilename: '[name].chunk.bundle.js', // for webpack chunk name setting
      clean: true, // cleans your build folder every time you build
    },
    plugins: [
      new webpack.DefinePlugin({ // define some build env variables
        'process.env': {
          BUILD_ENV: JSON.stringify(env.BUILD_ENV),
          IS_BROWSER: true,
        }
      }),
      new MiniCSSExtractPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html", // to import index.html file inside index.js
      }),
      new LoadablePlugin()
    ],
    devServer: {
      port: 8092, // you can change the port
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/, // .js and .jsx files
          exclude: /node_modules/, // excluding the node_modules folder
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(s(a|c)ss)$/, // styles files
          use: [MiniCSSExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
          loader: "url-loader",
          options: { limit: false },
        },
      ],
    },
  })
};