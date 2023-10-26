import React from 'react';
import {observer} from 'mobx-react-lite';
import {View} from 'react-native';
import {variance} from '../../core';
import LottieView from 'lottie-react-native';
import {useRoot} from '../../core/Root/hooks';
import {expr} from 'mobx-utils';

export const EmptyContent = observer(() => {
  const {
    windowDimensionsState: {screen},
  } = useRoot();
  const size = expr(() => Math.min(screen.height, screen.width) - 50);
  return (
    <RootView>
      <LottieContainerView>
        <LottieView
          style={{width: size, height: size}}
          source={require('../../assets/lottie/space.json')}
          autoPlay
          loop
        />
      </LottieContainerView>
    </RootView>
  );
});

const RootView = variance(View)(() => ({
  root: {
    flex: 1,
  },
}));

const LottieContainerView = variance(View)(() => ({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
