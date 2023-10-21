import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {AuthStackBindingProps} from './AuthStackBindingProps';
import {WelcomeInfoAppScreen} from '../../screens/WelcomeInfoAppScreen';

export type WelcomeInfoAppBindingProps =
  AuthStackBindingProps<'WelcomeInfoApp'>;

export default observer(function WelcomeInfoAppBinding({
  navigation,
}: WelcomeInfoAppBindingProps) {
  const goToWelcomeLanguages = useCallback(
    () => navigation.navigate('WelcomeLanguages'),
    [navigation],
  );
  return <WelcomeInfoAppScreen onNextPress={goToWelcomeLanguages} />;
});
