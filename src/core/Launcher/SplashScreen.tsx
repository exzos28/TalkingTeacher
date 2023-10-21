import React from 'react';
import {View, Text} from 'react-native';

import {variance} from '../styling';

export default function SplashScreen() {
  return (
    <RootView>
      <Text>Logo</Text>
    </RootView>
  );
}

const RootView = variance(View)(theme => ({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette['background-basic-color-1'],
  },
}));
