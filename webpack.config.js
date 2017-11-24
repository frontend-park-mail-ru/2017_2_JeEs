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
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg|babylon)$/,
                loader: 'url-loader?limit=30000&name=./[name]-[hash].[ext]',
            }, {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }, {
                test: /\.(pug|jade)$/,
                loader: 'pug-loader'
            },
        ],
    },
    recordsOutputPath: path.join(__dirname, 'dist', 'records.json')
};
