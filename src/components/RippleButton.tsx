import React from 'react';

import {observer} from 'mobx-react-lite';
import {RectButton, RectButtonProps} from 'react-native-gesture-handler';
import {useTheme} from '../core';

export type RippleButtonProps = RectButtonProps & {};

export const RippleButton = observer((props: RippleButtonProps) => {
  const theme = useTheme();
  const underlayColor = theme.palette['color-primary-500'];
  const rippleColor = theme.chroma(underlayColor).alpha(0.01).hex();
  return (
    <RectButton
      rippleColor={rippleColor}
      underlayColor={underlayColor}
      {...props}
    />
  );
});
