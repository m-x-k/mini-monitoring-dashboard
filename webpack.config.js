const path = require('path');
const config = {
  entry: './jsx/app.jsx',
  output: {
    path: path.resolve(__dirname, 'src/static/js/'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['stage-0', 'react']
                }
            }
        ]
      }
    ]
  }

};

module.exports = config;
