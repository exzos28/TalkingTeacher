import {observer} from 'mobx-react-lite';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {BottomTabBinding} from './BottomTabBinding';
import {RootParamList} from './RootParamList';
import CreateChatBinding from './CreateChatBinding';
import ChatBinding from './ChatBinding';
import PickLanguageForSettingsBinding from './PickLanguageForSettingsBinding';

const {Navigator, Screen} = createStackNavigator<RootParamList>();

// TODO: l10n
export const RootNavigator = observer(() => {
  return (
    <Navigator
      initialRouteName="Root"
      screenOptions={{
        cardShadowEnabled: true,
        headerBackTitleVisible: false,
      }}>
      <Screen
        name="Root"
        component={BottomTabBinding}
        options={{headerShown: false}}
      />
      <Screen
        name="CreateChat"
        component={CreateChatBinding}
        options={{title: 'Create chat'}}
      />
      <Screen name="Chat" component={ChatBinding} options={{title: 'Chat'}} />
      <Screen
        name="PickLanguageForSettings"
        component={PickLanguageForSettingsBinding}
        options={{title: 'Select language', headerBackTitleVisible: false}}
      />
    </Navigator>
  );
});
