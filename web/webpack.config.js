const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "public/bootstrap.js"),
  output: {
    filename: "bootstrap.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  plugins: [new CopyWebpackPlugin(["public/index.html"])],
};
