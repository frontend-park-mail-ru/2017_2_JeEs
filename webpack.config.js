'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunksWebpackPlugin = require('inline-chunks-html-webpack-plugin');

module.exports = [
    {
        context: __dirname,
        entry: {
            bundle: './app/application.js',
        },
        output: {
            filename: '[name].js',
            path: path.join(__dirname, 'dist'),
        },
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
                    loader: 'url-loader?name=fonts/[name].[ext]',
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
        plugins: [
            new webpack.optimize.CommonsChunkPlugin("commons.chunk"),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'public/index.html',
                inject: true,
            }),
            new webpack.optimize.AggressiveSplittingPlugin({
                minSize: 30000,
                maxSize: 50000
            }),
        ]
    }, {
        context: __dirname,
        entry: {
            serviceworker: './app/modules/service-worker.js'
        },
        output: {
            filename: 'service-worker.js',
            path: path.join(__dirname, 'dist'),
        },
    },
];