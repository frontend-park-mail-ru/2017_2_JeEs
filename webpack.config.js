'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname,
    output: {
        filename: './bundle.js',
        path: __dirname + '/dist'
    },
    entry: './app/application.js',
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
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
    plugins: [
        new ExtractTextPlugin('./bundle.css')
    ]
};
