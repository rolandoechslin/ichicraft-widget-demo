import merge from 'webpack-merge';
import common from './webpack.common';
import fs from 'fs';
import os from 'os';
import path from 'path';
import url from 'url';
import serveConfig from './config/serve.config';
import webpack from 'webpack';
import { DebugComponentType } from '@ichicraft/widgets-widget-base/lib/types';

let serveUrl = serveConfig.widgetsDebugPageUrl
    ? new url.URL(serveConfig.widgetsDebugPageUrl)
    : null;

if (serveUrl) {
    serveUrl.searchParams.append('debugWidgetManifest', 'https://localhost:8080/manifest.json');
    if (serveConfig.debugComponentType !== DebugComponentType.Default) {
        serveUrl.searchParams.append(
            'debugWidgetCpntType',
            serveConfig.debugComponentType.toString()
        );
    }
}

const config: webpack.Configuration = merge(common, {
    mode: 'development',

    devtool: 'inline-source-map',

    devServer: {
        contentBase: path.join(__dirname, './dist'),
        writeToDisk: true,
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        https: {
            // We use the SPFx localhost certificate here that was trusted by using gulp trust-dev-cert
            cert: fs.existsSync(os.homedir() + '/.gcb-serve-data/gcb-serve.cer')
                ? fs.readFileSync(os.homedir() + '/.gcb-serve-data/gcb-serve.cer')
                : fs.readFileSync(os.homedir() + '/.rushstack/rushstack-serve.pem'),
            key: fs.existsSync(os.homedir() + '/.gcb-serve-data/gcb-serve.key')
                ? fs.readFileSync(os.homedir() + '/.gcb-serve-data/gcb-serve.key')
                : fs.readFileSync(os.homedir() + '/.rushstack/rushstack-serve.key'),
        },
        open: !!serveUrl,
        openPage: serveUrl ? serveUrl.href : '',
    },
});

// Force unique class names to prevent issues with loaded class names from original script
config.module.rules[1].use[2].options.modules.localIdentName = '[local]_' + new Date().getTime();

export default config;
