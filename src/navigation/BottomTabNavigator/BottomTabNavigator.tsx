import React from 'react';
import {observer} from 'mobx-react-lite';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashboardBinding from './DashboardBinding';
import {BottomTabParamList} from './BottomTabParamList';
import DebugBinding from './DebugBinding';
import {useRoot} from '../../core/Root/hooks';

const {Navigator, Screen} = createBottomTabNavigator<BottomTabParamList>();

// TODO: l10n
export default observer(function BottomTabNavigator() {
  const {debug} = useRoot();
  return (
    <Navigator initialRouteName="Dashboard">
      <Screen
        name="Dashboard"
        component={DashboardBinding}
        options={{title: 'Chats'}}
      />
      {debug.debugEnabled && <Screen name="Debug" component={DebugBinding} />}
    </Navigator>
  );
});
