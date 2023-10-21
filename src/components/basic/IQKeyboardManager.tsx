import React, {useCallback} from 'react';
import {Platform, ScrollViewProps, View} from 'react-native';

import {useFocusEffect} from '@react-navigation/core';
import RNKeyboardManager from 'react-native-keyboard-manager';

// hack for the situation when the screen is mounted before the previous one is unmounted.
let mountCount = 0;

export default ({children, ...rest}: ScrollViewProps) => {
  const onFocusEffect = useCallback(() => {
    if (Platform.OS === 'ios') {
      mountCount++;
      RNKeyboardManager.setEnable(true);
    }
    return () => {
      if (Platform.OS === 'ios') {
        mountCount--;
        if (mountCount === 0) {
          RNKeyboardManager.setEnable(false);
        }
      }
    };
  }, []);

  useFocusEffect(onFocusEffect);

  return <View {...rest}>{children}</View>;
};
