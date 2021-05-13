module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    library: "SQLiteDBWorker",
    filename: "bundle.js",
  },
  devServer: {
    publicPath: "/dist",
  },
};
