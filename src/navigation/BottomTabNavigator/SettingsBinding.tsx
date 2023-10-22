import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {RootBottomTabBindingProps} from './RootBottomTabBindingProps';
import SettingsContainer from '../../containers/SettingsContainer';
import {usePromisifyNavigation} from '../../core/Navigation';
import {WelcomeLanguagesBindingProps} from '../AuthNavigator/WelcomeLanguagesBinding';

export type SettingsBindingProps = RootBottomTabBindingProps<'Settings'>;

export default observer(function SettingsBinding({
  navigation,
}: SettingsBindingProps) {
  const {promisifyNavigate: navigateToLanguage} = usePromisifyNavigation<
    WelcomeLanguagesBindingProps['route']
  >(() => navigation.navigate('PickLanguageForSettings'));
  const pickLanguage = useCallback(async () => {
    const params = await navigateToLanguage();
    if (params) {
      return params.pickedLanguage;
    }
    return undefined;
  }, [navigateToLanguage]);

  return <SettingsContainer pickLanguage={pickLanguage} />;
});
