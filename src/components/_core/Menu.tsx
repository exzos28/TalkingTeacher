import React from 'react';
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewProps,
} from 'react-native';

import {observer} from 'mobx-react-lite';
import {RectButtonProps} from 'react-native-gesture-handler';

import {
  AlignItems,
  AvailableGutter,
  Bubble,
  Cell,
  Direction,
  Grid,
  Gutter,
  Space,
} from '../basic';

export type MenuProps = ViewProps & {
  children: React.ReactNode | React.ReactNode[];
};

export default observer(function Menu(props: MenuProps) {
  return <Space gutter={Gutter.Large} {...props} />;
});

export type MenuGroupProps = ViewProps & {
  title?: string;
  children: React.ReactNode | React.ReactNode[];
};

export type InternalMenuGroupProps = {
  theme: MenuGroupTheme;
};

export type MenuGroupTheme = {
  text: StyleProp<TextStyle>;
};

export const MenuGroup = observer(
  ({
    title,
    children,
    theme,
    ...rest
  }: MenuGroupProps & InternalMenuGroupProps) => {
    return (
      <Space {...rest}>
        {title !== undefined && (
          <Bubble gutter={[0, Gutter.Middle]}>
            <Text style={[styles.menuGroupTitleText, theme.text]}>{title}</Text>
          </Bubble>
        )}
        <View>{children}</View>
      </Space>
    );
  },
);

const styles = StyleSheet.create({
  menuGroupTitleText: {
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  menuItemContentBubble: {
    borderBottomWidth: 0.5,
  },
  disabledContentGrid: {
    opacity: 0.5,
  },
  contentCell: {minHeight: 30, justifyContent: 'center'},
  menuItemTitleText: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.17,
  },
  menuItemSubTitleText: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.17,
  },
  menuIconRootView: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export enum MenuItemVariant {
  Default,
  Danger,
}

export type MenuItemProps = {
  title: string;
  subtitle?: string | null | false;
  left?: React.ReactNode;
  right?: React.ReactNode;
  onPress?: () => void;
  variant?: MenuItemVariant;
  contentGutter?: AvailableGutter;
  disabled?: boolean;
};

export type MenuItemTheme = {
  Button: React.ComponentType<RectButtonProps>;
  border: ColorValue;
  itemTitle: StyleProp<TextStyle>;
  itemTitleDanger: StyleProp<TextStyle>;
  itemSubTitle: StyleProp<TextStyle>;
};

export type InternalMenuItemProps = {
  theme: MenuItemTheme;
};

export const MenuItem = observer(
  ({
    title,
    subtitle,
    left,
    right,
    onPress,
    variant,
    contentGutter = [12, Gutter.Small],
    disabled,
    theme,
  }: MenuItemProps & InternalMenuItemProps) => {
    const {Button, border, itemTitle, itemTitleDanger, itemSubTitle} = theme;
    const enabled = onPress !== undefined && !disabled;
    return (
      <Button onPress={onPress} enabled={enabled}>
        <Bubble gutter={[0, Gutter.Middle]}>
          <Bubble
            style={[styles.menuItemContentBubble, {borderColor: border}]}
            gutter={contentGutter}>
            <Grid
              style={!enabled && styles.disabledContentGrid}
              direction={Direction.Row}
              gutter={Gutter.Small}
              align={AlignItems.Center}>
              {left && <Cell flex={0}>{left}</Cell>}
              <Cell>
                <Space gutter={Gutter.Tiny}>
                  <Text
                    style={[
                      styles.menuItemTitleText,
                      itemTitle,
                      variant === MenuItemVariant.Danger && itemTitleDanger,
                    ]}>
                    {title}
                  </Text>
                  {typeof subtitle === 'string' && (
                    <Text style={[styles.menuItemSubTitleText, itemSubTitle]}>
                      {subtitle}
                    </Text>
                  )}
                </Space>
              </Cell>
              {right && <Cell flex={0}>{right}</Cell>}
            </Grid>
          </Bubble>
        </Bubble>
      </Button>
    );
  },
);

export type MenuItemIconProps = ViewProps & {
  Icon: React.ComponentType;
};

export const MenuItemIcon = observer(({Icon, ...rest}: MenuItemIconProps) => {
  return (
    <View style={styles.menuIconRootView} {...rest}>
      <Icon />
    </View>
  );
});
