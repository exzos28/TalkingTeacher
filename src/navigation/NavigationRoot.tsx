import React from 'react';
import {observer} from 'mobx-react-lite';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {variance} from '../core';
import {RootNavigator} from './RootNavigator';
import {useRoot} from '../core/Root/hooks';
import {AuthNavigator} from './AuthNavigator';

export const NavigationRoot = observer(() => {
  const {
    navigationContainerBinding,
    linkingOptionsProvider,
    navigationContainerTheme,
  } = useRoot();
  return (
    <RootView>
      <NavigationContainer
        theme={navigationContainerTheme.theme}
        linking={linkingOptionsProvider.linkingOptions}
        {...navigationContainerBinding.props}>
        <RootNavigator />
      </NavigationContainer>
      <View style={styles.layer} pointerEvents="box-none">
        <NavigationContainer theme={navigationContainerTheme.theme} independent>
          <AuthNavigator />
        </NavigationContainer>
      </View>
    </RootView>
  );
});
const RootView = variance(View)(theme => ({
  root: {
    flex: 1,
    backgroundColor: theme.palette['background-basic-color-1'],
  },
}));

const styles = StyleSheet.create({
  layer: {
    ...StyleSheet.absoluteFillObject,
  },
});
