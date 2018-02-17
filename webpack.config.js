const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./build.config');

const PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = merge({

    entry: './src/web-client/entry',

    output: {
        path: path.resolve(__dirname, 'build/web-client/static'),
        filename: 'app.js',
        publicPath: '/',
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [path.resolve(__dirname, 'src')],
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: true,
                                localIdentName: '[name]--[local]--[hash:base64:5]',
                                sourceMap: !PRODUCTION,
                                minimize: PRODUCTION
                            },
                        },
                        'postcss-loader',
                    ],
                }),
            },
        ],
    },

    plugins: PRODUCTION ? [
        new ExtractTextPlugin('styles.css'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new webpack.optimize.UglifyJsPlugin(),
    ] : [
        new ExtractTextPlugin('styles.css'),
    ],

    resolve: {
        extensions: ['.js', '.json', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },

    devtool: !PRODUCTION && 'inline-source-map',

    devServer: !PRODUCTION && {
        contentBase: path.join(__dirname, 'src/web-client/static'),
        port: 9000,
        historyApiFallback: true,
    },
}, config.webpack);