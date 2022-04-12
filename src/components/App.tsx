import * as React from 'react';

import { LikeIcon } from './LikeIcon';
import {
    CustomCommandBarItemSeverity,
    WidgetContext,
} from "@ichicraft/widgets-widget-base";
import styles from '../styles/widget.module.scss';
import { Stack } from '@fluentui/react';
import { UserConfiguration } from '../types';
import { AdminConfiguration } from '../types';
import { useTranslation } from 'react-i18next';

export interface AppProps {
    context: WidgetContext;
    userConfiguration: UserConfiguration;
    adminConfiguration: AdminConfiguration;
}

const App: React.FunctionComponent<AppProps> = (props) => {
    const { t } = useTranslation();

    // Example implementation of registering and unregistering a custom command bar item to widget header
    React.useEffect(
        () => {
            // This registers a custom icon button in the widget header.
            props.context.instance.registerCustomCommandBarItem({
                iconName: "Cake",
                severity: CustomCommandBarItemSeverity.Normal,
                tooltipContent:
                    "This is a cake!",
                showTooltipAutomatically: true,
                // If you leave out the onClick event it will just be non-clickable icon!
                onClick: () => {
                    // To remove your command bar item, just unregister it like we did on click in this example
                    props.context.instance.unregisterCustomCommandBarItem();
                },
            });
        },
        [
            /** Run once */
        ]
    );

    return (
        <div className={styles.root}>
            <p>{t('greeting')}</p>
            <Stack horizontal horizontalAlign="center">
                {Array(props.adminConfiguration.numberOfLikes)
                    .fill(0)
                    .map((_, i) => (
                        <LikeIcon key={i} color={props.userConfiguration.color}/>
                    ))}
            </Stack>

            {props.userConfiguration.showInfo && (
                <ul>
                    <li>
                        {t('manifestIdLabel')}: <strong>{props.context.manifest.id}</strong>
                    </li>
                    <li>
                        {t('instanceIdLabel')}: <strong>{props.context.instance.id}</strong>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default App;
