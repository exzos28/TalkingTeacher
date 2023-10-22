import {observer} from 'mobx-react-lite';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import WelcomeLanguagesBinding from './WelcomeLanguagesBinding';
import {AuthParamList} from './AuthParamList';
import PickLanguageForWelcomeLanguagesBinding from './PickLanguageForWelcomeLanguagesBinding';
import WelcomeInfoAppBinding from './WelcomeInfoAppBinding';
import {useRoot} from '../../core/Root/hooks';
import {FULFILLED} from '../../core/AsyncAtom';

const {Navigator, Screen} = createStackNavigator<AuthParamList>();

// TODO: l10n
export default observer(function AuthStack() {
  const {flags} = useRoot();
  if (flags.state?.status !== FULFILLED) {
    return null;
  }
  if (flags.state.result.get('WELCOMES_DONE')) {
    return null;
  }
  return (
    <Navigator screenOptions={{cardShadowEnabled: true}}>
      <Screen
        name="WelcomeInfoApp"
        component={WelcomeInfoAppBinding}
        options={() => ({
          headerShown: false,
        })}
      />
      <Screen
        name="WelcomeLanguages"
        component={WelcomeLanguagesBinding}
        options={() => ({
          headerShown: false,
        })}
      />
      <Screen
        name="PickLanguageForWelcomeLanguages"
        component={PickLanguageForWelcomeLanguagesBinding}
        options={{title: 'Select language', headerBackTitleVisible: false}}
      />
    </Navigator>
  );
});
