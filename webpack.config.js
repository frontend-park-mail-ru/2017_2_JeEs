'use strict';

const webpack = require('webpack');
let path = require('path');

module.exports = {
    context: __dirname,
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
    },
    entry: './app/application.js',
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }, {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader-es3' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'sass-loader' // compiles Sass to CSS
                }]
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=3000&name=images/[name].[ext]',
            },
            {
                test: /\.(ttf)$/,
                loader: 'url-loader?limit=3000&name=fonts/[name].[ext]',
            },
            {
                test: /\.(babylon)$/,
                loader: 'url-loader?limit=3000&name=meshes/[name].[ext]',
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            }, {
                test: /\.(pug|jade)$/,
                loader: 'pug-loader'
            },
        ],
    },
};
