import {observer} from 'mobx-react-lite';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SettingsBinding from './SettingsBinding';
import {BottomTabBinding} from './BottomTabBinding';
import {RootParamList} from './RootParamList';

const {Navigator, Screen} = createStackNavigator<RootParamList>();

export const RootNavigator = observer(() => {
  return (
    <Navigator screenOptions={{headerShown: false, cardShadowEnabled: true}}>
      <Screen
        name="Root"
        component={BottomTabBinding}
        options={{headerShown: false}}
      />
      <Screen name="Settings" component={SettingsBinding} />
    </Navigator>
  );
});
