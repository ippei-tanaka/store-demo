const path = require('path');
// const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

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
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    },
                    'postcss-loader',
                ],
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.json', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },

    devtool: 'source-map',

    devServer: {
        contentBase: path.join(__dirname, 'src/web-client/static'),
        // compress: true,
        port: 9000,
        historyApiFallback: true,
    },
};