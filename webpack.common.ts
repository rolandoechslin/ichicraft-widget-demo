import path from 'path';
import manifestConfig from './config/manifest.config';
import VisualizerWebpackPlugin from 'webpack-visualizer-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CreateFileWebpack from 'create-file-webpack';
import webpack from 'webpack';

const config: webpack.Configuration = {
    output: {
        library: `widget_${manifestConfig.id.replace(/-/g, '_')}`,
        libraryTarget: 'amd',
        filename: `./bundle.js`,
        publicPath: path.resolve(__dirname, './dist'),
        path: path.resolve(__dirname, './dist'),
    },

    entry: './src/index.ts',

    performance: {
        hints: false,
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.module\.s[ac]ss$/,
                use: [
                    {
                        loader: '@microsoft/loader-load-themed-styles', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-modules-typescript-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName:
                                    '[local]_[hash:base64:5]_' + manifestConfig.id.split('-')[0],
                            },
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [require('autoprefixer')],
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            // Prefer `dart-sass`
                            implementation: require('sass'),
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName:
                                    '[local]_[hash:base64:5]_' + manifestConfig.id.split('-')[0],
                            },
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [require('autoprefixer')],
                            },
                        },
                    },
                ],
            },
            {
                test: /i18n/,
                loader: '@alienfast/i18next-loader',
                query: { basenameAsNamespace: true },
                exclude: /node_modules/,
            },
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss'],
    },

    externals: {},

    plugins: [
        new CleanWebpackPlugin(),
        new VisualizerWebpackPlugin(),
        new CreateFileWebpack({
            path: './dist',
            fileName: 'manifest.json',
            content: JSON.stringify({ ...manifestConfig, bundleFilePath: 'bundle.js' }),
        }),
    ],
};

// Keep some of the dependencies out of the bundle, as defined in the manifest config
// When configured correctly, externals/dependencies will be loaded by the widget loader
// in the Widget Board solution
manifestConfig.externals &&
    Object.keys(manifestConfig.externals).forEach((e) => {
        config.externals[e] = e;
    });

export default config;
