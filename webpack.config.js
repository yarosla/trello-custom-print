/**
 * Usage:
 *   API_KEY=xxx webpack -p | -d
 */

var webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    CopyWebpackPlugin = require('copy-webpack-plugin');

var contextDir = path.join(__dirname, 'src'),
    API_KEY = process.env.API_KEY, // pass API_KEY from environment or command line
    outputDir = process.argv.find(function(o) { return o.startsWith('-p') }) ? 'dist.min' : 'dist';

console.log('output dir:', outputDir);
console.log('API key:', API_KEY);

module.exports = {
    context: contextDir,
    entry: {
        vendor: 'vendor.ts',
        app: 'app.bootstrap.ts'
    },
    output: {
        path: outputDir,
        filename: '[name].bundle.js',
        sourceMapFilename: '[file].map',
        chunkFilename: '[id].chunk.js'
    },
    resolve: {
        root: [contextDir],
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            {test: /\.ts$/, loaders: ['awesome-typescript', 'angular2-template']},
            {test: /\.css$/, loader: ExtractTextPlugin.extract([/*'style',*/ 'css?-autoprefixer&minimize&importLoaders=1&sourceMap', 'postcss'])},
            {test: /\.scss$/, loader: ExtractTextPlugin.extract([/*'style',*/ 'css?-autoprefixer&minimize&importLoaders=1&sourceMap', 'postcss', 'sass?sourceMap'])},
            {test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'file?name=assets/[name].[ext]'},
            {test: /\.html?$/, loader: 'raw'}
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
        new webpack.DefinePlugin({
            TRELLO_API_KEY: JSON.stringify(API_KEY)
        }),
        new webpack.ProvidePlugin({ // for Bootstrap to work
            jQuery: 'jquery'
        }),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({name: ['app', 'vendor'], minChunks: Infinity}),
        new ExtractTextPlugin('[name].css', {allChunks: true}),
        new CopyWebpackPlugin([
            {from: 'index.htm'}
        ])
    ],
    sassLoader: {
        outputStyle: 'nested',
        precision: 10,
        errLogToConsole: true
    },
    postcss: function() {
        return [
            require('autoprefixer')({browsers: ['last 3 versions']})
        ];
    },
    cache: true,
    // debug: true,
    // devtool: 'source-map',
    node: {
        global: 1,
        crypto: 'empty',
        module: 0,
        Buffer: 0,
        clearImmediate: 0,
        setImmediate: 0
    }
};
