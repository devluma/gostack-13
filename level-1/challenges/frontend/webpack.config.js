const patch = require("path");

module.exports = {
  entry: patch.resolve(__dirname, "src", "index.js"),
  output: {
    path: patch.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  devServer: {
    contentBase: patch.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      {
        test: /.*\.(gif|png|jpe?g)$/i,
        use: {
          loader: "file-loader",
        },
      },
    ],
  },
};
