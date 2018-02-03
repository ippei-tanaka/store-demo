const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

    entry: "./src/web-client/entry",

    output: {
        path: path.resolve(__dirname, "build/web-client/assets"),
        filename: "app.js",
        publicPath: "/"
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [path.resolve(__dirname, "src")],
                loader: "babel-loader"
            },
            // {
            //     test: /\.html$/,
            //     include: [path.resolve(__dirname, "src")],
            //     loader: "file-loader",
            //     options: {
            //         name: "[path][name].[ext]"
            //     }
            // }
        ]
    },

    resolve: {
        extensions: [".js", ".json", ".jsx"],
        alias: {
            "@": path.resolve(__dirname, "src"),
        }
    },

    devtool: "source-map",

    //target: "node",

    //context: path.resolve(__dirname, "src"),

    // plugins: [new HtmlWebpackPlugin({
    //     title: "Store Demo 343",
    //     filename: path.resolve(__dirname, "src/web-client/assets/index.html"),
    //     //template: path.resolve(__dirname, "src/client/index.html")
    // })],

    devServer: {
        contentBase: path.join(__dirname, "src/web-client/assets"),
        // compress: true,
        port: 9000,
        historyApiFallback: true
    }
};