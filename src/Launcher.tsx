import React, {useEffect} from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

import {observer} from 'mobx-react-lite';
import RNBootSplash from 'react-native-bootsplash';

import {useRoot} from './core/Root/hooks';

export default observer(function Launcher({children}: ViewProps) {
  const {
    navigationContainer: {isReady},
  } = useRoot();
  useEffect(() => {
    async function run() {
      await RNBootSplash.hide({fade: true});
    }
    if (isReady) {
      // noinspection JSIgnoredPromiseFromCall
      run();
    }
  }, [isReady]);
  return <View style={styles.root}>{children}</View>;
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
