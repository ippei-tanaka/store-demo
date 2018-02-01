const path = require("path");

module.exports = {

    entry: "./src/client/app",

    output: {
        path: path.resolve(__dirname, "build/client"),
        filename: "bundle.js",
        publicPath: "/assets/"
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [path.resolve(__dirname, "src")],
                loader: "babel-loader"
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

    //plugins: [],
};