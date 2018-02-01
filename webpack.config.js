const path = require("path");
//const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

    entry: "./src/client/assets/scripts/app",

    output: {
        path: path.resolve(__dirname, "build/client/assets/scripts"),
        filename: "app.js",
        publicPath: "/assets/scripts"
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [path.resolve(__dirname, "src")],
                loader: "babel-loader"
            },
            {
                test: /\.html$/,
                include: [path.resolve(__dirname, "src")],
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]"
                }
            }
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
    //     title: "Store Demo",
    //     filename: path.resolve(__dirname, "build/client/index.html"),
    //     //template: path.resolve(__dirname, "src/client/index.html")
    // })]
};