const path = require("path");

module.exports = {
  entry: { main: ".script/script.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "",
  },
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "dist"),
    compress: true,
    open: true,
    port: 8080,
  },
};
