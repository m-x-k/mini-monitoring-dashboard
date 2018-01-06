#!/bin/bash

npm install --save-dev babel-cli babel-plugin-transform-react-jsx babel-preset-es2017

babel src/static/js/app.jsx --plugins transform-react-jsx --presets es2017 --out-file src/static/js/app.js
