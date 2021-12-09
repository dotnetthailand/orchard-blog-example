const outputFileName = 'orchard-example-react-client';
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")


module.exports = {
  entry: {
    [`wwwroot/scripts/${outputFileName}`]: './src/main',
  },
  mode: 'development',
  output: {
    path: __dirname, // Output dir must be absolute path
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    fallback: {
      'crypto': require.resolve('crypto-browserify'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      },
    ]// End rules
  },
  plugins: [
    new NodePolyfillPlugin(),
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  // https://webpack.js.org/configuration/devtool/
  devtool: 'inline-source-map',
};
