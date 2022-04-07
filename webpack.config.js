var path = require('path');
var SRC_DIR = path.join(__dirname, "client/src");
var DIST_DIR = path.join(__dirname, "client/dist");

module.exports = {
    entry: `${SRC_DIR}/index.js`,
    output: {
      filename: "bundle.js",
      path: DIST_DIR,
    },
    module: {
      rules: [
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
        },
        },
        {
          test: /\.(png|jp(e*)g|svg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'images/[hash]-[name].[ext]',
              },
            },
          ],
        },],
    },
  };