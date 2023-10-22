import React from 'react';
import {observer} from 'mobx-react-lite';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashboardBinding from './DashboardBinding';
import {BottomTabParamList} from './BottomTabParamList';
import DebugBinding from './DebugBinding';
import {useRoot} from '../../core/Root/hooks';
import SettingsBinding from './SettingsBinding';
import {sized, useTheme} from '../../core';
import {BarChartSvg, SettingsSvg} from '../../assets/svg/colorless';

const {Navigator, Screen} = createBottomTabNavigator<BottomTabParamList>();

// TODO: l10n
export default observer(function BottomTabNavigator() {
  const {debug} = useRoot();
  const theme = useTheme();
  const tabBarInactiveTintColor = theme.palette['color-basic-600'];
  return (
    <Navigator
      initialRouteName="Dashboard"
      screenOptions={{tabBarInactiveTintColor: tabBarInactiveTintColor}}>
      <Screen
        name="Dashboard"
        component={DashboardBinding}
        options={{
          title: 'Chats',
          tabBarIcon: BarChartIcon,
        }}
      />
      <Screen
        name="Settings"
        component={SettingsBinding}
        options={{title: 'Settings', tabBarIcon: SettingsIcon}}
      />
      {debug.debugEnabled && <Screen name="Debug" component={DebugBinding} />}
    </Navigator>
  );
});

const BarChartIcon = sized(BarChartSvg, 20);
const SettingsIcon = sized(SettingsSvg, 20);
