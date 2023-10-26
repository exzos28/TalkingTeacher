import React from 'react';

import {observer} from 'mobx-react-lite';
import {expr} from 'mobx-utils';
import OriginalMenu, {
  MenuGroupProps,
  MenuGroupTheme,
  MenuItemIconProps,
  MenuItemProps,
  MenuItemTheme,
  MenuItemVariant,
  MenuProps,
  MenuGroup as OriginalMenuGroup,
  MenuItem as OriginalMenuItem,
  MenuItemIcon as OriginalMenuItemIcon,
} from './_core/Menu';
import {useTheme} from '../core';
import {RippleButton} from './RippleButton';

export {MenuItemVariant};
export type {MenuItemProps};

export const Menu = observer((props: MenuProps) => {
  return <OriginalMenu {...props} />;
});

export const MenuGroup = observer((props: MenuGroupProps) => {
  const theme = useTheme();
  const groupTheme: MenuGroupTheme = expr(() => ({
    text: {
      ...theme.fontByWeight('600'),
      color: theme.palette['text-basic-color'],
    },
  }));
  return <OriginalMenuGroup {...props} theme={groupTheme} />;
});

export const MenuItem = observer((props: MenuItemProps) => {
  const theme = useTheme();
  const itemTheme: MenuItemTheme = expr(() => ({
    Button: RippleButton,
    border: theme.palette['border-basic-color-1'],
    itemTitle: {
      ...theme.fontByWeight('400'),
      color: theme.palette['text-basic-color'],
    },
    itemTitleDanger: {
      color: theme.palette['text-basic-color'],
    },
    itemSubTitle: {
      ...theme.fontByWeight('400'),
      color: theme.chroma(theme.palette['text-basic-color']).alpha(0.5).hex(),
    },
  }));
  return <OriginalMenuItem {...props} theme={itemTheme} />;
});

export const MenuItemIcon = observer((props: MenuItemIconProps) => {
  return <OriginalMenuItemIcon {...props} />;
});
