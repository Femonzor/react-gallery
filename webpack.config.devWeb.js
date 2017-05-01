var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlPlugin = require("html-webpack-plugin");

var ROOT_PATH = __dirname;
var SRC_PATH = ROOT_PATH + "/src";
var DIST_PATH = ROOT_PATH + "/dist";
var SITE_DIR = "/react-gallery";

module.exports = {
    devtool: "source-map",
    entry: [
        "webpack-dev-server/client?http://localhost:9990",
        "webpack/hot/only-dev-server",
        SRC_PATH + "/App.js"
    ],
    output: {
        path: DIST_PATH,
        publicPath: "http://localhost:9990" + SITE_DIR + "/dist/",
        filename: "js/bundle.js"
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
    devServer: {
        host: "0.0.0.0",
        inline: true,
        compress: true,    //是否启用gzip压缩
        port: 9990,
        hot: true
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        }),
        new HtmlPlugin({
            filename: "index.html",
            template: SRC_PATH + "/templates/index.html",
            hash: false,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("css/[name].css"),
    ]
};