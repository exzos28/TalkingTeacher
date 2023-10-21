import React, {forwardRef, useCallback} from 'react';
import {Alert, GestureResponderEvent, Text, TextProps} from 'react-native';

import {setStringAsync} from 'expo-clipboard';

export type CopyableProps = TextProps & {
  children?: string;
};

export default forwardRef<Text, CopyableProps>(
  ({children, onPress: _onPress, style, ...rest}, ref) => {
    const onPress = useCallback(
      async (event: GestureResponderEvent) => {
        if (children) {
          await setStringAsync(children);
          Alert.alert('The value has been copied to clipboard');
        }
        if (_onPress) {
          _onPress(event);
        }
      },
      [_onPress, children],
    );
    return (
      <Text style={[style]} {...rest} onPress={onPress} ref={ref}>
        {children}
      </Text>
    );
  },
);
