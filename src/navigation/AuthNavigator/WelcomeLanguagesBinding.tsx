import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {AuthStackBindingProps} from './AuthStackBindingProps';
import {usePromisifyNavigation} from '../../core/Navigation';
import {WelcomeLanguagesScreen} from '../../screens/WelcomeLanguagesScreen';
import {useRoot} from '../../core/Root/hooks';

export type WelcomeLanguagesBindingProps =
  AuthStackBindingProps<'WelcomeLanguages'>;

export default observer(function WelcomeLanguagesBinding({
  navigation,
}: WelcomeLanguagesBindingProps) {
  const {promisifyNavigate: navigateToLanguage} = usePromisifyNavigation<
    WelcomeLanguagesBindingProps['route']
  >(() => navigation.navigate('PickLanguageForWelcomeLanguages'));
  const {flags} = useRoot();
  const pickLanguage = useCallback(async () => {
    const params = await navigateToLanguage();
    if (params) {
      return params.pickedLanguage;
    }
    return undefined;
  }, [navigateToLanguage]);
  const finish = useCallback(async () => {
    await flags.setFlag('WELCOMES_DONE', true);
  }, [flags]);
  return (
    <WelcomeLanguagesScreen onNextPress={finish} pickLanguage={pickLanguage} />
  );
});
