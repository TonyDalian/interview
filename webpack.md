Webpack  (Parcel)
    Code Splitting 
    Loader(css, sass, jsx)
    Clever Parsing
    Plugin

npm init

npm i --save-dev webpack webpack-dev-server webpack-cli

#es5->es6 jsx->js babel-preset-es2015 import
npm i --save-dev babel-core babel-loader babel-preset-env babel-preset-react html-webpack-plugin
babel-polyfill

webpack.config.js

path 
html-webpack-plugin

entry 
output path.join(__dirname, '/dist')

module 
    rules 
        test 
        exclude
        use loader

    devtool: isDevMode ? "source-map" : false,
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },

babel-loader  js
html-loader html
file-loader image font json
sass-loader node-sass scss 
style-loader css-loader css

plugin 
    html-webpack-plugin
       template
       filename
    min-css-extract-plugin
       filename
       chunkFilename
    clean-webpack-plugin


.babelrc
    {
        "presets": ["env", "react"]
    }

webpack-dev-server
```js
"scripts": {
    "start": "webpack-dev-server --mode development --open --hot",
    "build": "./node_modules/.bin/webpack --mode production"
}
``