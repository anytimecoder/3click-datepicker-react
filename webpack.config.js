var webpack = require('webpack');
var path = require('path');

var config = {
  entry: './src/Datepicker.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' }
    ]
  }
};
//
//   // set the `app` directory as the context
//   context: path.join(__dirname + '/src'),
//
//   // Entry points, can be multiple
//   entry: {
//     app: './client/App.js',
//     vendor: [
//       'd3',
//       'lodash',
//       'react',
//     ],
//   },
//
//   // the output for DEVELOPMENT
//   output: {
//     path: path.join(__dirname + '/src'),
//     publicPath: 'http://localhost:8080/',
//     filename: '[name].js' // based on the entry point key name
//   },
//
//   // Allow CORS for devServer
//   devServer: {
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//     },
//   },
//
//   // `eval` to see the generated code (DEV only) (see Console Sources tab)
//   // `eval-source-map` the exact code (DEV only)
//   // `source-map` generates source map files (for PRODUCTION)
//   devtool: 'eval-source-map',
//
//   plugins: [
//     new webpack.DefinePlugin({
//       'process.env': {
//         'NODE_ENV': '"local"',
//       },
//     }),
//
//     // common code used between the different entry points
//     //new webpack.optimize.CommonsChunkPlugin('common.js'),
//     new webpack.optimize.CommonsChunkPlugin( /* chunkName= */ 'vendor', /* filename= */ 'vendor.bundle.js'),
//
//     // hot reload
//     new webpack.HotModuleReplacementPlugin(),
//
//     //new webpack.ProvidePlugin({ _: 'lodash' })
//     // these are available globally, and we don't need to require them in every file
//     new webpack.ProvidePlugin({
//       '_': 'lodash',
//       'React': 'react',
//       'd3': 'd3',
//       'moment': 'moment',
//     }),
//   ],
//
//   module: {
//     loaders: [{
//       test: /\.js$/,
//       loader: 'babel-loader',
//       exclude: /node_modules/,
//       query: {
//         stage: 0
//       }
//     }, {
//       test: /\.html$/,
//       loader: 'html',
//       exclude: /node_modules/
//     }, {
//       test: /\.json/,
//       loader: 'json',
//       exclude: /node_modules/
//     }, {
//       test: /\.(woff)$/,
//       loader: 'file?name=resources/fonts/[name].[ext]?[hash]'
//     }, {
//       test: /\.(png|jpg|jpeg|gif)$/,
//       loader: 'file?name=resources/images/[name].[ext]?[hash]|image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
//     }, ],
//
//     // Shut off warnings about using pre-built javascript files
//     // as Quill.js unfortunately ships one as its `main`.
//     noParse: /node_modules\/quill\/dist/,
//   },
//
//   resolveLoader: {
//     root: path.join(__dirname, 'node_modules'),
//   },
//
//   resolve: {
//     root: path.join(__dirname, 'node_modules'),
//
//     modulesDirectories: [
//       'node_modules',
//     ],
//
//     // you can now require('file') instead of require('file.js')
//     extensions: ['', '.js'],
//   },
//
// };


module.exports = config;
