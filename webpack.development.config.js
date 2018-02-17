const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.config');

module.exports = merge(common, {

    devtool: 'inline-source-map',

    devServer: {
        contentBase: path.join(__dirname, 'src/web-client/static'),
        // compress: true,
        port: 9000,
        historyApiFallback: true,
    }
});