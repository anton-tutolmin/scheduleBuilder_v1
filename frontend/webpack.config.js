const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public/dist');
const FRONTEND_DIR = path.resolve(__dirname, 'src');

const config = {
  mode: 'development',
  entry: FRONTEND_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [],
};

module.exports = config;
