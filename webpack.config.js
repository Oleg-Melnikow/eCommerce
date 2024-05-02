const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./src/index"),
  module: {
    rules: [
      {
        test: /\.(?:ico|png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
