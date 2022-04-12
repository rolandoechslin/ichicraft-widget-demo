import { WidgetManifestConfig } from '@ichicraft/widgets-widget-base';

import manifest_resources_de from '../src/i18n/de/manifest.json';
import manifest_resources_en from '../src/i18n/en/manifest.json';
import manifest_resources_es from '../src/i18n/es/manifest.json';
import manifest_resources_fr from '../src/i18n/fr/manifest.json';
import manifest_resources_nb from '../src/i18n/nb/manifest.json';
import manifest_resources_nl from '../src/i18n/nl/manifest.json';
import manifest_resources_pt from '../src/i18n/pt/manifest.json';

const manifestConfig: WidgetManifestConfig = {
    manifestVersion: 2,
    id: 'ec6f2af5-c417-4ed5-8c38-006af2323ac0',
    name: 'Demo 1',
    scriptUrl: '',
    notificationIcon: 'FavoriteStar',
    version: '0.1.0',
    widgetBoardCompatibilityVersion: 1,
    isConfigurableByAdmin: true,
    isConfigurableByUser: true,
    minRows: 2,
    maxRows: 2,
    maxCols: 1,
    resources: [
        {
            lang: 1031,
            ...manifest_resources_de,
            images: {
                preview_small:
                    'https://ichicraft.blob.core.windows.net/widgetboard/images/widgets/widget-generator-preview.png',
                preview:
                    'https://ichicraft.blob.core.windows.net/widgetboard/images/widgets/widget-generator.png',
                additional: [],
            },
        },
        {
            lang: 1033,
            ...manifest_resources_en,
            images: {
                preview_small:
                    'https://ichicraft.blob.core.windows.net/widgetboard/images/widgets/widget-generator-preview.png',
                preview:
                    'https://ichicraft.blob.core.windows.net/widgetboard/images/widgets/widget-generator.png',
                additional: [],
            },
        },
        {
            lang: 1036,
            ...manifest_resources_fr,
            images: {
                preview_small:
                    'https://ichicraft.blob.core.windows.net/widgetboard/images/widgets/widget-generator-preview.png',
                preview:
                    'https://ichicraft.blob.core.windows.net/widgetboard/images/widgets/widget-generator.png',
                additional: [],
            },
        },
        {
            lang: 1043,
            ...manifest_resources_nl,
            images: {
                preview_small:
                    'https://ichicraft.blob.core.windows.net/widgetboard/images/widgets/widget-generator-preview.png',
                preview:
                    'https://ichicraft.blob.core.windows.net/widgetboard/images/widgets/widget-generator.png',
                additional: [],
            },
        },
        {
            lang: 1044,
            ...manifest_resources_nb,
            images: {
                preview_small:
                    'https://ichicraft.blob.core.windows.net/widgetboard/images/widgets/widget-generator-preview.png',
                preview:
                    'https://ichicraft.blob.core.windows.net/widgetboard/images/widgets/widget-generator.png',
                additional: [],
            },
        },
        {
            lang: 2070,
            ...manifest_resources_pt,
            images: {
                preview_small:
                    'https://ichicraft.blob.core.windows.net/widgetboard/images/widgets/widget-generator-preview.png',
                preview:
                    'https://ichicraft.blob.core.windows.net/widgetboard/images/widgets/widget-generator.png',
                additional: [],
            },
        },        
        {
            lang: 3082,
            ...manifest_resources_es,
            images: {
                preview_small:
                    'https://ichicraft.blob.core.windows.net/widgetboard/images/widgets/widget-generator-preview.png',
                preview:
                    'https://ichicraft.blob.core.windows.net/widgetboard/images/widgets/widget-generator.png',
                additional: [],
            },
        },
    ],
    webApiPermissionRequests: [],
    externals: {
        react: {
            path: 'https://cdn.jsdelivr.net/npm/react@16.8.0/umd/react.production.min.js',
        },
        'react-dom': {
            path: 'https://cdn.jsdelivr.net/npm/react-dom@16.8.0/umd/react-dom.production.min.js',
            dependencyMappings: {
                react: 'react',
            },
        },
        '@fluentui/react': {
            path: 'https://cdn.jsdelivr.net/npm/@fluentui/react@8.34.1/dist/fluentui-react.umd.js',
            dependencyMappings: {
                React: 'react',
                ReactDOM: 'react-dom',
            },
        },    
        i18next: {
            path: 'https://cdn.jsdelivr.net/npm/i18next@20.6.1/dist/umd/i18next.min.js',
        },
        'react-i18next': {
            path: 'https://cdn.jsdelivr.net/npm/react-i18next@11.12.0/dist/amd/react-i18next.min.js',
            dependencyMappings: {
                react: 'react',
            },
        },
    },
};

export default manifestConfig;