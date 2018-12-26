const path = require('path');

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(...args));
}

module.exports = {
  mode: 'production',
  node: {
    fs: 'empty'
  },
  entry: root('client/app/index.js'),
  output: {
    path: root('client/dist/'),
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.js', '.html'],
    alias: {
      'app': 'client/app'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: root('client'),
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      }
    ]
  },
  watch: true
};
