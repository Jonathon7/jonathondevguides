require("@babel/polyfill");
const webpack = require("webpack");
const dotenv = require("dotenv");
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const env = dotenv.config().parsed;

module.exports = {
  context: path.resolve(__dirname, "../src"),
  entry: ["@babel/polyfill", "./index.js"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              camelCase: true,
              localIdentName: "[name]__[local]___[hash:base64:5]"
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg)$/,
        use: "file-loader"
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "Fonts/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "./index.html",
      inject: false
    }),
    new webpack.DefinePlugin({
      "process.env.iFRAMELY_PLUGIN": JSON.stringify(env.iFRAMELY_PLUGIN)
    })
  ]
};
