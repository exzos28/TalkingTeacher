import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {OnboardingScreen} from '../../screens/OnboardingScreen';
import {AuthStackBindingProps} from './AuthStackBindingProps';
import {usePromisifyNavigation} from '../../core/Navigation';

export type WelcomeStep1BindingProps = AuthStackBindingProps<'WelcomeStep1'>;

export default observer(function WelcomeStep1Binding({
  navigation,
}: WelcomeStep1BindingProps) {
  const {promisifyNavigate: navigateToLanguage} = usePromisifyNavigation<
    WelcomeStep1BindingProps['route']
  >(() => navigation.navigate('PickLanguageForWelcomeStep1'));
  const pickLanguage = useCallback(async () => {
    const params = await navigateToLanguage();
    if (params) {
      return params.pickedLanguage;
    }
    return undefined;
  }, [navigateToLanguage]);
  return <OnboardingScreen pickLanguage={pickLanguage} />;
});
