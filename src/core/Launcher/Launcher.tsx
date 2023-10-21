import React, {useEffect, useState} from 'react';
import {Platform, StatusBar, StyleSheet, View, ViewProps} from 'react-native';

import {observer} from 'mobx-react-lite';
import {expr} from 'mobx-utils';
// import RNBootSplash from 'react-native-bootsplash';
import Animated, {FadeOut} from 'react-native-reanimated';

import SplashScreen from './SplashScreen';
import {useRoot} from '../Root/hooks';
import {variance} from '../styling';

export default observer(function Launcher({children}: ViewProps) {
  const {
    navigationContainer: {isReady},
    windowDimensionsState,
  } = useRoot();
  const [splashVisible, setSplashVisible] = useState(true);
  useEffect(() => {
    async function run() {
      // await RNBootSplash.hide();
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSplashVisible(false);
    }
    if (isReady) {
      // noinspection JSIgnoredPromiseFromCall
      run();
    }
  }, [isReady]);
  const screenHeight = expr(() => windowDimensionsState.screen.height);
  const windowHeight = expr(() => windowDimensionsState.window.height);
  const height = Platform.OS === 'android' ? screenHeight : windowHeight;
  const top = Platform.OS === 'android' ? -(StatusBar.currentHeight || 0) : 0;
  return (
    <View style={styles.root}>
      {children}
      {splashVisible && (
        <SplashView style={{height, top}} exiting={FadeOut.duration(300)}>
          <SplashScreen />
        </SplashView>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

const SplashView = variance(Animated.View)(() => ({
  root: {
    ...StyleSheet.absoluteFillObject,
  },
}));
