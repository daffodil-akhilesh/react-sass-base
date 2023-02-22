const path = require("path");
const webpack = require("webpack");
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = (env) => {
  return ({
    entry: './server/index.js', // webpack starts building dependency graph from here
    target: 'node', //environment engine
    mode: env.BUILD_ENV, //build environment
    externals: [nodeExternals()],
    output: {
      path: path.join(__dirname, "server-build"), // the bundle output path
      filename: "index.js", // the name of the server file,
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(js)$/, // .js and .jsx files
          exclude: /node_modules/, // excluding the node_modules folder
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(s(a|c)ss)$/, // styles
          use: ['css-loader', 'sass-loader']
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
          loader: "url-loader",
          options: { limit: false },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          BUILD_ENV: JSON.stringify(env.BUILD_ENV),
          IS_BROWSER: false,
        }
      }),
    ],
  })
};