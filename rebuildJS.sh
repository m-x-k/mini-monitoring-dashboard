#!/bin/bash

npm install --save-dev babel-cli babel-plugin-transform-react-jsx babel-preset-es2015

babel src/static/js/app.jsx --plugins transform-react-jsx --out-file src/static/js/app.js