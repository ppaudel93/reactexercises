const webpack = require("webpack");
const path = require("path");

const BUILD_DIR = path.resolve(`${__dirname}/static`);
const APP_DIR = path.resolve(`${__dirname}/src/client`);

module.exports = {
  entry: {
    app: [`${APP_DIR}/index.js`, "webpack-hot-middleware/client"]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  output: {
    path: BUILD_DIR,
    filename: "bundle.js"
  },
  devtool: "source-map",
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".css"]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["react", "es2015", "stage-1"]
        }
      }
    ]
  }
};
