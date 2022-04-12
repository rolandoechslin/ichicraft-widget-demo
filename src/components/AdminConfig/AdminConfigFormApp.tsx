import * as React from 'react';

import { ValidationResult, WidgetContext } from '@ichicraft/widgets-widget-base';

import { 
    Stack,
    Slider, 
    Toggle, 
} from '@fluentui/react';

import styles from '../../styles/widget.module.scss';
import { AdminConfiguration } from '../../types';
import { useTranslation } from 'react-i18next';

export interface AdminConfigFormAppProps {
    context: WidgetContext;
    configuration: AdminConfiguration;
    onRegisterConfigFunction: (
        getConfigFunc: () => { numberOfLikes: number; allowShowInfoUserConfig: boolean }
    ) => void;
    onRegisterValidateFunction: (validateFormFunc: () => ValidationResult) => void;
}

const AdminConfigFormApp: React.FunctionComponent<AdminConfigFormAppProps> = (props) => {
    const [numberOfLikes, setNumberOfLikes] = React.useState(1);
    const [allowShowInfoUserConfig, setAllowShowInfoUserConfig] = React.useState(true);
    const [isValidating, setIsValidating] = React.useState(false);

    const { t } = useTranslation();

    React.useEffect(() => {
        setNumberOfLikes(props.configuration.numberOfLikes);
        setAllowShowInfoUserConfig(props.configuration.allowShowInfoUserConfig);
    }, [props.configuration]);

    React.useEffect(() => {
        const getCurrentConfiguration = () => {
            return {
                numberOfLikes,
                allowShowInfoUserConfig,
            };
        };

        props.onRegisterConfigFunction(getCurrentConfiguration);
    }, [numberOfLikes, allowShowInfoUserConfig]);

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
            if (numberOfLikes > 0 && numberOfLikes < 6) {
                validationResult.isValid = true;
            } else {
                validationResult.isValid = false;
                validationResult.errors.push(t('adminConfigFormInvalidMessage'));
            }

            return validationResult;
        };

        props.onRegisterValidateFunction(validate);
    }, [numberOfLikes]);

    const onNumberOfLikesChanged = React.useCallback((noLikes: number) => {
        setNumberOfLikes(noLikes);
    }, []);

    const onAllowShowInfoUserConfigurationToggled = React.useCallback((checked: boolean) => {
        setAllowShowInfoUserConfig(checked);
    }, []);

    return (
        <div>
            <h2>{t('widgetSettings')}</h2>

            <Stack>
                <Slider
                    label={t('numberOfLikesLabel')}
                    min={0}
                    max={5}
                    step={1}
                    defaultValue={0}
                    value={numberOfLikes}
                    showValue
                    snapToStep
                    onChange={(value) => {
                        onNumberOfLikesChanged(value);
                    }}
                />

                <div
                    className={styles.fieldWarning}
                    hidden={!isValidating || (numberOfLikes > 0 && numberOfLikes < 6)}
                >
                    {t('adminConfigNumberOfLikesInvalidError')}
                </div>

                <Toggle
                    checked={allowShowInfoUserConfig}
                    onChange={(_event, checked) => {
                        onAllowShowInfoUserConfigurationToggled(checked);
                    }}
                    label={t('allowShowInfoConfigToggleLabel')}
                />
            </Stack>
        </div>
    );
};

export default AdminConfigFormApp;
