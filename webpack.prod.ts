import merge from 'webpack-merge';
import common from './webpack.common';
import webpack from 'webpack';

const TerserPlugin = require('terser-webpack-plugin');

const config: webpack.Configuration = merge(common, {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
});

export default config;
