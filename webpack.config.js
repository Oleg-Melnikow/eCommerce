const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: path.resolve(__dirname, "./src/index"),
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [new Dotenv()],
  resolve: {
    extensions: [".ts", ".tsx", ".js", "json"],
    alias: {
      pages: path.resolve(__dirname, "./src/pages"),
      components: path.resolve(__dirname, "./src/components"),
      api: path.resolve(__dirname, "./src/api"),
      helpers: path.resolve(__dirname, "./src/helpers"),
      types: path.resolve(__dirname, "./src/types"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      assets: path.resolve(__dirname, "./src/assets"),
      reducers: path.resolve(__dirname, "./src/reducers"),
    },
  },
};
