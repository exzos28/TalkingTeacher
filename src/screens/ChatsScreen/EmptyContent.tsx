import React from 'react';
import {observer} from 'mobx-react-lite';
import {View} from 'react-native';
import {variance} from '../../core';
import LottieView from 'lottie-react-native';
import {Button} from '@ui-kitten/components';
import {useRoot, useStrings} from '../../core/Root/hooks';
import {expr} from 'mobx-utils';
import {PADDING} from '../constants';

export type EmptyContentProps = {
  onCreatePress(): void;
};

export const EmptyContent = observer(({onCreatePress}: EmptyContentProps) => {
  const {
    windowDimensionsState: {screen},
  } = useRoot();
  const strings = useStrings();
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
      <ButtonView>
        <Button size="giant" onPress={onCreatePress}>
          {strings['chats.createChat']}
        </Button>
      </ButtonView>
    </RootView>
  );
});

const RootView = variance(View)(() => ({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
}));

const ButtonView = variance(View)(() => ({
  root: {
    padding: PADDING,
  },
}));

const LottieContainerView = variance(View)(() => ({
  root: {
    alignItems: 'center',
  },
}));
