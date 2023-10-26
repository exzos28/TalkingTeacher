import {observer} from 'mobx-react-lite';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import {BottomTabBinding} from './BottomTabBinding';
import {RootParamList} from './RootParamList';
import CreateChatBinding from './CreateChatBinding';
import ChatBinding from './ChatBinding';
import PickLanguageForSettingsBinding from './PickLanguageForSettingsBinding';
import {useStrings} from '../../core/Root/hooks';

const {Navigator, Screen} = createStackNavigator<RootParamList>();

export const RootNavigator = observer(() => {
  const strings = useStrings();
  return (
    <Navigator
      initialRouteName="Root"
      screenOptions={{
        cardShadowEnabled: true,
        headerBackTitleVisible: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Screen
        name="Root"
        component={BottomTabBinding}
        options={{headerShown: false}}
      />
      <Screen
        name="CreateChat"
        component={CreateChatBinding}
        options={{title: strings['navigation.createChat']}}
      />
      <Screen
        name="Chat"
        component={ChatBinding}
        options={{title: strings['navigation.chat']}}
      />
      <Screen
        name="PickLanguageForSettings"
        component={PickLanguageForSettingsBinding}
        options={{
          title: strings['navigation.selectLanguage'],
          headerBackTitleVisible: false,
        }}
      />
    </Navigator>
  );
});
