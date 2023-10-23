import React from 'react';
import {observer} from 'mobx-react-lite';
import {variance} from '../../core';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';

export const SendingView = observer(() => {
  return (
    <RootView>
      <LottieView
        style={{width: 100, height: 100}}
        source={require('../../assets/lottie/chat-loading.json')}
        autoPlay
        loop
      />
    </RootView>
  );
});

const RootView = variance(View)(theme => ({
  root: {
    backgroundColor: theme.palette['color-basic-transparent-400'],
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
}));
