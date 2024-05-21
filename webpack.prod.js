const path = require("path");
const common = require("./webpack.config");
const { merge } = require("webpack-merge");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    assetModuleFilename: "assets/[name][ext]",
    clean: true,
  },
  optimization: {
    minimizer: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        favicon: "./src/assets/favicon.png",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin({ filename: "./styles.css" })],
});
