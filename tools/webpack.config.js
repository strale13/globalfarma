const path = require('path');
const Webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const PUBLICPATH = '/dest/';
const ROOTPATH = path.resolve(__dirname, '..');
const SRCPATH = path.resolve(ROOTPATH, 'assets');
const DESTPATH = path.resolve(ROOTPATH, 'dest');

module.exports = (_, {mode}) => {
    let production = mode === 'production';

    return {
        mode: mode,
        cache: !production,
        watch: !production,
        devtool: production ? false : 'inline-source-map',
        target: 'web',
        entry: {
            bundle: [path.resolve(SRCPATH, 'index.js')]
        },
        output: {
            filename: '[name].js',
            path: DESTPATH,
            chunkFilename: '[name].js',
            publicPath: PUBLICPATH
        },
        resolve: {
            extensions: ['.js', '.less']
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    include: [SRCPATH],
                    query: {
                        compact: production,
                        cacheDirectory: true
                    }
                }, {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 1000,
                        name: 'images/[hash:8].[ext]'
                    }
                }, {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 1000,
                        name: 'fonts/[hash:8].[ext]'
                    }
                }, {
                    test: /\.(c|le)ss$/,
                    use: [
                        'style-loader',
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: production,
                                sourceMap: !production,
                                root: SRCPATH
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: !production,
                                plugins: () => [require('autoprefixer')()]
                            }
                        }, {
                            loader: 'less-loader',
                            options: {
                                sourceMap: !production,
                                relativeUrls: false
                            }
                        }
                    ]
                }
            ]
        },
        optimization: {
            minimize: production,
            minimizer: [
                new UglifyJsWebpackPlugin({
                    sourceMap: !production,
                    uglifyOptions: {
                        ecma: 8,
                        toplevel: true,
                        compress: {
                            warnings: false
                        },
                        output: {
                            comments: false,
                            beautify: false
                        }
                    }
                }),
                new OptimizeCSSAssetsWebpackPlugin({
                    cssProcessor: require('cssnano'),
                    cssProcessorOptions: {
                        discardComments: {removeAll: true},
                        zindex: false
                    },
                    canPrint: true
                })
            ]
        },
        plugins: [
            new Webpack.DefinePlugin({
                PRODUCTION: JSON.stringify(production)
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css'
            }),
            new CopyWebpackPlugin([
                {from: path.resolve(SRCPATH, 'assets'), to: path.resolve(DESTPATH)}
            ]),
            ...(production ? [
                new CleanWebpackPlugin([DESTPATH], {root: ROOTPATH, verbose: false})
            ] : [
                new FriendlyErrorsWebpackPlugin()
            ])
        ]
    };
};
