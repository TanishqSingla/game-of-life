const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "/public/bootstrap.js",
  output: {
    filename: "bootstrap.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "public/index.html", to: "index.html" }],
    }),
  ],
  experiments: {
    outputModule: true,
    syncWebAssembly: true,
    topLevelAwait: true,
    asyncWebAssembly: true,
    layers: true,
  },
};
