// Webpack
var path                    = require('path');
var webpack                 = require('webpack');
var fs  = require('fs');

// Plugins
var HtmlWebpackPlugin       = require('html-webpack-plugin');
var ExtractTextPlugin       = require('extract-text-webpack-plugin');
var CleanWebpackPlugin      = require('clean-webpack-plugin');
var BrowserSyncPlugin       = require('browser-sync-webpack-plugin');

// Postcss Config
require('./postcss.config.js');

const VENDOR_LIBS = ["lodash"];
const envBoolean = process.env.NODE_ENV == 'development' ? true : false;

// Ant design
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './ant-theme-vars.less'), 'utf8'));

// Webpacks core concepts
const config = {
    entry: {
        bundle: './src/index.js',
        vendor: VENDOR_LIBS
    },

    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'js/[name].js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    plugins: [
                        ['import', { libraryName: "antd", style: true }]
                    ]
                }
            },
            {
                test: /\.(scss|sass|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })
            },
            {
                test: /\.less$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "less-loader",
                      options: {
                        javascriptEnabled: true,
                        modifyVars: themeVariables
                    }
                }
                ]
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash].[ext]',
                            outputPath: 'img/'
                        }
                    },
                    'img-loader'                        // Calling img loader
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
           },
            {
                test: /\.(mov|mp4)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name]-[hash].[ext]',
                        outputPath: 'videos/'
                    }
                }]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),                   // Cleaning 'dist' folder
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']                   // Watch entry section with the key 'vendor' and if there is any duplicates, only include it in vendor
        }),
        new ExtractTextPlugin({                             // Extracting css to production
            filename: 'css/style.[chunkhash].css',
            disable: envBoolean
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'                  // Duplicating and injecting script tags for our output files
        })
    ]
};


if (process.env.NODE_ENV == 'development') {
    config.plugins.push(
        new BrowserSyncPlugin({
                host: 'localhost',
                port: 3000,
                proxy: 'http://localhost:8080/'
        }, {
                reload: false                               // Reload browsersync on all devices
        }),
        new webpack.NamedModulesPlugin(),                   // Make it easier to see which dependencies are being patched
        new webpack.HotModuleReplacementPlugin()            // HMR plugin
    );

    config.devtool = 'source-map';

    config.devServer = {
        historyApiFallback: true,
        contentBase: './dist',                             // Which root-folder devServer should serve
        watchContentBase: true,
        hot: true,
        stats: { children: false }                         // HMR
   }
}



if (process.env.NODE_ENV == 'production') {
    config.output.filename = 'js/[name].[chunkhash].js'    // Chuckhash depending of the content in the file. same content = same name

    config.plugins.push(
        new webpack.DefinePlugin({                                            // For react, dropping bundle size
          'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true })              // Uglifying
    )
}

module.exports = config;
