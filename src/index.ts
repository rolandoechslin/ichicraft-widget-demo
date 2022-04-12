import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BaseWidget } from '@ichicraft/widgets-widget-base';

import i18next, { i18n } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import * as resources from './i18n';

import App from './components/App';

import { UserConfiguration } from './types';
import UserConfigFormApp from './components/UserConfig/UserConfigFormApp';

import { AdminConfiguration } from './types';
import AdminConfigFormApp from './components/AdminConfig/AdminConfigFormApp';

import { ConfigurationHelper } from '@ichicraft/widgets-widget-base/lib/utils';

export default class Widget extends BaseWidget {
    private i18nextInstance: i18n;
    protected widgetDomElement: HTMLDivElement;
    protected widgetUserConfigDomElement: HTMLDivElement;
    protected widgetAdminConfigDomElement: HTMLDivElement;
        
    // This function will be called by the widget board when the containing DOM element needs to be cleared or removed.
    cleanupResources() {
        // Unmount the React component to clean up everything that was rendered and kept in memory by React
        if (this.widgetDomElement) {
            ReactDOM.unmountComponentAtNode(this.widgetDomElement);
        }
        if (this.widgetUserConfigDomElement) {
            ReactDOM.unmountComponentAtNode(this.widgetUserConfigDomElement);
        }
        if (this.widgetAdminConfigDomElement) {
            ReactDOM.unmountComponentAtNode(this.widgetAdminConfigDomElement);
        }
    }

    protected async onInit(): Promise<void> {
        await super.onInit();

        // Create an instance of i18next to be used in scope of widget
        // This instance is passed to child components (React) using I18nextProvider
        this.i18nextInstance = i18next.createInstance();
        await this.i18nextInstance.init({
            lng: this.context.language, // set the current language
            fallbackLng: 'en',
            debug: false,
            interpolation: {
                escapeValue: false,
            },
            defaultNS: 'main',
            resources,
        });
    }

    // Main render function for the widget component
    render(domElement: HTMLDivElement): void {
        this.widgetDomElement = domElement;


        const userConfig = this.parseConfiguration<UserConfiguration>(this.context.instance.data, {
            color: '',
            showInfo: true,
        });

        const adminConfig = this.parseConfiguration<AdminConfiguration>(
            this.context.definition.data,
            {
                numberOfLikes: 1,
                allowShowInfoUserConfig: true,
            }
        );

        const element = React.createElement(
            I18nextProvider,
            { i18n: this.i18nextInstance },
            React.createElement(App, {
                context: this.context,
                userConfiguration: userConfig,
                adminConfiguration: adminConfig,
            })
        );

        ReactDOM.render(element, this.widgetDomElement);
    }

    // Main render function for the widget configuration component
    renderUserConfigurationForm(domElement: HTMLDivElement) {
        this.widgetUserConfigDomElement = domElement;

        const config = this.parseConfiguration<UserConfiguration>(this.context.instance.data, {
            color: '',
            showInfo: true,
        });

        const adminConfig = this.parseConfiguration<AdminConfiguration>(
            this.context.definition.data,
            {
                numberOfLikes: 1,
                allowShowInfoUserConfig: true,
            }
        );

        const element = React.createElement(
            I18nextProvider,
            { i18n: this.i18nextInstance },
            React.createElement(UserConfigFormApp, {
                context: this.context,
                configuration: config,
                allowShowInfoConfiguration: adminConfig.allowShowInfoUserConfig,
                onRegisterConfigFunction: (getConfigFunc) => {
                    // This function gets called whenever the user clicks the "Save" button in the
                    // configuration panel.
                    // It should return the serialized user configuration for a widget that will
                    // then be stored by the Widget Board.
                    this.getSerializedUserConfiguration = () => {
                        return ConfigurationHelper.stringifyConfiguration(getConfigFunc());
                    };
                },
                onRegisterValidateFunction: (validateFunc) => {
                    // This function gets called by the widget board when a user clicks on "Save"
                    // It allows the widget to prevent the user from finishing an incomplete configuration form
                    this.validateUserConfigurationForm = validateFunc;
                },
            })
        );

        ReactDOM.render(element, this.widgetUserConfigDomElement);
    }

    // This function gets called by the widget board to verify if existing stored configuration is valid
    // Two example cases where configuration might be invalid:
    // 1. Configuration is missing alltogether, maybe because the widget was placed on the board as part of a bundle
    // 2. Configuration used to be valid, but a new version of the widget might require different configuration
    async verifyPersistedUserConfiguration(serializedConfig: string): Promise<boolean> {
        // Next we try to parse the input string into the object type we expect.
        // This might fail, which will be interpreted as invalid configuration
        let config: UserConfiguration;
        try {
            config = ConfigurationHelper.parseConfiguration<UserConfiguration>(serializedConfig);
        } catch (ex) {
            return false;
        }

        // If nothing resulted in faulty configuration up until now, we return true, since it must be correct
        return true;
    }

    // Main render function for the widget configuration component
    renderAdminConfigurationForm(domElement: HTMLDivElement) {
        this.widgetAdminConfigDomElement = domElement;

        const config = this.parseConfiguration<AdminConfiguration>(this.context.definition.data, {
            numberOfLikes: 1,
            allowShowInfoUserConfig: true,
        });

        const element = React.createElement(
            I18nextProvider,
            { i18n: this.i18nextInstance },
            React.createElement(AdminConfigFormApp, {
                context: this.context,
                configuration: config,
                onRegisterConfigFunction: (getConfigFunc) => {
                    // This function gets called whenever the admin clicks the "Save" button in the
                    // configuration panel.
                    // It should return the serialized admin configuration for a widget that will
                    // then be stored by the Widget Board.
                    this.getSerializedAdminConfiguration = () => {
                        return ConfigurationHelper.stringifyConfiguration(getConfigFunc());
                    };
                },
                onRegisterValidateFunction: (validateFunc) => {
                    // This function gets called by the widget board when a user clicks on "Save"
                    // It allows the widget to prevent the user from finishing an incomplete configuration form
                    this.validateAdminConfigurationForm = validateFunc;
                },
            })
        );

        ReactDOM.render(element, this.widgetAdminConfigDomElement);
    }

    // This function gets called by the widget board to verify if existing stored configuration is valid
    // Two example cases where configuration might be invalid:
    // 1. Necessary configuration is missing alltogether, maybe because the widget was placed on the board as part of a bundle
    // 2. Configuration used to be valid, but a newer version of the widget might require different/additional configuration
    async verifyPersistedAdminConfiguration(serializedConfig: string): Promise<boolean> {
        // Next we try to parse the input string into the object type we expect.
        // This might fail, which will be interpreted as invalid configuration
        let config: AdminConfiguration;
        try {
            config = ConfigurationHelper.parseConfiguration<AdminConfiguration>(serializedConfig);
        } catch (ex) {
            return false;
        }

        // If nothing resulted in faulty configuration up until now, we return true, since it must be correct
        return true;
    } 

    private parseConfiguration<T>(data: string, defaultConfig: T): T {
        let config: T = null;
        if (data && data.length > 0) {
            config = ConfigurationHelper.parseConfiguration<T>(data);
        } else {
            // fallback to default
            config = defaultConfig;
        }
        return config;
    }
}
