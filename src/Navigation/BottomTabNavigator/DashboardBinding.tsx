import React from 'react';
import {observer} from 'mobx-react-lite';
import {RootBottomTabBindingProps} from './RootBottomTabBindingProps';
import {View} from 'react-native';

export type DashboardBindingProps = RootBottomTabBindingProps<'Dashboard'>;

export default observer(function DashboardBinding({}: DashboardBindingProps) {
  return <View />;
});
