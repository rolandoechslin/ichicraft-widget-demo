import * as React from 'react';

import { mergeStyles, mergeStyleSets, DefaultPalette, FontIcon } from '@fluentui/react';

const iconClass = mergeStyles({
    fontSize: 40,
    height: 40,
    width: 40,
    margin: 10,
});

const classNames = mergeStyleSets({
    default: [{ color: DefaultPalette.black }, iconClass],
    red: [{ color: DefaultPalette.red }, iconClass],
    yellow: [{ color: DefaultPalette.yellow }, iconClass],
    blue: [{ color: DefaultPalette.blue }, iconClass],
    green: [{ color: DefaultPalette.green }, iconClass],
    magenta: [{ color: DefaultPalette.magenta }, iconClass],
});

export interface LikeIconProps {
    color?: string;
}

export const LikeIcon: React.FunctionComponent<LikeIconProps> = (props) => {
    return <FontIcon iconName='LikeSolid' className={classNames[props.color || 'default']} />;
};
