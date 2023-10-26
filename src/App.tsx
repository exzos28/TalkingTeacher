import React, {useEffect, useState} from 'react';
import {StatusBar, ViewProps} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {useRoot} from './core/Root/hooks';
import RootProvider from './core/Root/RootProvider';
import {NavigationRoot} from './navigation';
import {useStyles} from './core/styling/hooks';
import {ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {useTheme} from './core/styling';
import Launcher from './Launcher';
import {default as mapping} from '../mapping.json';

function Wrapper({children}: ViewProps) {
  const styles = useStyles(theme => ({
    root: {
      flex: 1,
      backgroundColor: theme.palette['background-basic-color-1'],
    },
  }));
  const {
    appearance: {isDark},
  } = useRoot();
  const theme = useTheme();

  return (
    <ApplicationProvider
      {...eva}
      customMapping={mapping as any}
      theme={theme.palette}>
      <GestureHandlerRootView style={styles.root}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={isDark ? 'light-content' : 'dark-content'}
        />
        <SafeAreaProvider>{children}</SafeAreaProvider>
      </GestureHandlerRootView>
    </ApplicationProvider>
  );
}

export default function App() {
  const [initialized] = useState(true);
  useEffect(() => {
    async function prepare() {
      //  code push
    }
    // noinspection JSIgnoredPromiseFromCall
    prepare();
  }, []);
  return initialized ? (
    <RootProvider>
      <Wrapper>
        <Launcher>
          <NavigationRoot />
        </Launcher>
      </Wrapper>
    </RootProvider>
  ) : null;
}

// const codePushOptions = {
//   checkFrequency: codePush.CheckFrequency.MANUAL,
//   // installMode: codePush.InstallMode.IMMEDIATE,
// };
// export default codePush(codePushOptions)(sentryWrap(AppRoot));
