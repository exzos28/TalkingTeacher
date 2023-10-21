import {observer} from 'mobx-react-lite';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import WelcomeStep1Binding from './WelcomeStep1Binding';
import {AuthParamList} from './AuthParamList';
import PickLanguageForOnboardingBinging from './PickLanguageForOnboardingBinging';

const {Navigator, Screen} = createStackNavigator<AuthParamList>();

export default observer(function AuthStack() {
  return (
    <Navigator screenOptions={{cardShadowEnabled: true}}>
      <Screen
        name="WelcomeStep1"
        component={WelcomeStep1Binding}
        options={() => ({
          headerShown: false,
        })}
      />
      <Screen
        name="PickLanguageForWelcomeStep1"
        component={PickLanguageForOnboardingBinging}
        options={{title: '', headerBackTitle: 'Back'}}
      />
    </Navigator>
  );
});
