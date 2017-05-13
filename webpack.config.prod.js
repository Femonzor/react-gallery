var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanPlugin = require("clean-webpack-plugin");
var HtmlPlugin = require("html-webpack-plugin");

var ROOT_PATH = __dirname;
var SRC_PATH = ROOT_PATH + "/src";
var DIST_PATH = ROOT_PATH + "/dist";
var SITE_DIR = "/react-gallery";

module.exports = {
    entry: {
        app: SRC_PATH + "/App.js",
        vendor: [
            "react",
            "react-dom",
            "classnames",
            "immutable",
            "react-redux",
            "redux",
            "redux-thunk"
        ]
    },
    output: {
        path: DIST_PATH,
        filename: "js/[name].[chunkhash:8].js",
        publicPath: SITE_DIR + "/dist/"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /^node_modules$/,
            loader: "babel-loader"
        }, {
            test: /\.less$/,
            exclude: /^node_modules$/,
            loader: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader!autoprefixer-loader!less-loader"
            })
        }, {
            test: /\.(eot|woff|svg|ttf|woff2)(\?|$)/,
            exclude: /^node_modules$/,
            loader: "file-loader?name=fonts/[name].[ext]"
        }, {
            test: /\.json$/,
            exclude: /^node_modules$/,
            loader: "json-loader"
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new HtmlPlugin({
            filename: "index.html",
            template: SRC_PATH + "/templates/index.html",
            chunksSortMode: "dependency"
        }),
        new ExtractTextPlugin("css/[name].[contenthash:8].css"),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor", "manifest"]
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,
            },
            compress: {
                warnings: false
            }
        }),
        new CleanPlugin(["dist"])
    ]
};