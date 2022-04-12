import * as React from 'react';

import { ValidationResult, WidgetContext } from '@ichicraft/widgets-widget-base';

import styles from '../../styles/widget.module.scss';
import { UserConfiguration } from '../../types';
import { useTranslation } from 'react-i18next';
import { Stack, Label, SwatchColorPicker, DefaultPalette, Toggle } from '@fluentui/react';

export interface UserConfigFormAppProps {
    context: WidgetContext;
    configuration: UserConfiguration;
    allowShowInfoConfiguration: boolean;
    onRegisterConfigFunction: (getConfigFunc: () => { color: string; showInfo: boolean }) => void;
    onRegisterValidateFunction: (validateFormFunc: () => ValidationResult) => void;
}

const UserConfigFormApp: React.FunctionComponent<UserConfigFormAppProps> = (props) => {
    const [color, setColor] = React.useState('');
    const [showInfo, setShowInfo] = React.useState(true);
    const [isValidating, setIsValidating] = React.useState(false);

    const { t } = useTranslation();

    React.useEffect(() => {
        setColor(props.configuration.color);
        setShowInfo(props.configuration.showInfo);
    }, [props.configuration]);

    React.useEffect(() => {
        const getCurrentConfiguration = () => {
            return {
                color,
                showInfo,
            };
        };

        props.onRegisterConfigFunction(getCurrentConfiguration);
    }, [color, showInfo]);

    React.useEffect(() => {
        const validate = () => {
            setIsValidating(true);

            // This is where we validate the form, in this case by checking the state of the component
            // Start with an invalid result
            let validationResult: ValidationResult = {
                isValid: false,
                errors: [],
            };

            // In this example we only check if a color was picked
            if (color) {
                validationResult.isValid = true;
            } else {
                validationResult.isValid = false;
                validationResult.errors.push(t('userConfigFormInvalidMessage'));
            }

            return validationResult;
        };

        props.onRegisterValidateFunction(validate);
    }, [color]);

    const onColorChanged = React.useCallback((id: string) => {
        setColor(id);
    }, []);

    const onShowInfoToggled = React.useCallback((checked: boolean) => {
        setShowInfo(checked);
    }, []);

    return (
        <div className={styles.userConfigRoot}>
            <Stack>
                <h2>{t('widgetSettings')}</h2>

                <Label required={true}>{t('pickAColor')}</Label>

                <SwatchColorPicker
                    columnCount={3}
                    cellHeight={35}
                    cellWidth={35}
                    selectedId={color}
                    cellShape={'square'}
                    colorCells={[
                        { id: 'red', label: t('red'), color: DefaultPalette.red },
                        { id: 'yellow', label: t('yellow'), color: DefaultPalette.yellow },
                        { id: 'blue', label: t('blue'), color: DefaultPalette.blue },
                        { id: 'green', label: t('green'), color: DefaultPalette.green },
                        { id: 'magenta', label: t('magenta'), color: DefaultPalette.magenta },
                    ]}
                    onColorChanged={onColorChanged}
                />

                <div className={styles.fieldWarning} hidden={!isValidating || !!color}>
                    {t('userConfigColorFieldRequiredError')}
                </div>

                {props.allowShowInfoConfiguration && (
                    <Toggle
                        checked={showInfo}
                        onChange={(_event, checked) => {
                            onShowInfoToggled(checked);
                        }}
                        label={t('showInfoToggleLabel')}
                    />
                )}
            </Stack>
        </div>
    );
};

export default UserConfigFormApp;
