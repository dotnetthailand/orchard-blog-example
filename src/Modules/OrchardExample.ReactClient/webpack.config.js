const outputFileName = 'orchard-example-react-client';

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
    extensions: ['.ts', '.tsx', '.js', '.jsx']
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
  plugins: [],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  // https://webpack.js.org/configuration/devtool/
  devtool: 'inline-source-map',
};
