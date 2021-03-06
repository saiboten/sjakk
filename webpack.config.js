/*eslint-disable */
const webpack = require('webpack');
/*eslint-enable */

module.exports = {
  entry: './public/index.jsx',
  output: {
    path: __dirname,
    filename: 'public/dist.js',
  },

  /* devServer: { TODO why this no work?
    contentBase: './public/',
    inline: true,
  },*/

  /* eslint: {
    configFile: '.eslintrc',
  }, */
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
};
