const merge = require('webpack-merge');
const common = require('./webpack.common.config');
const webpack = require('webpack');

module.exports = merge(common, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin()
    ],
});