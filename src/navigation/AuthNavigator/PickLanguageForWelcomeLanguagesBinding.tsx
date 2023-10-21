import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {AuthStackBindingProps} from './AuthStackBindingProps';
import {Locale} from '../../core/Localization';
import {PickLanguageContainer} from '../../containers/PickLanguageContainer';

export type PickLanguageForWelcomeStep1BindingProps =
  AuthStackBindingProps<'PickLanguageForWelcomeLanguages'>;

export default observer(function PickLanguageForWelcomeLanguagesBinding(
  props: PickLanguageForWelcomeStep1BindingProps,
) {
  const {navigation} = props;
  const onSelect = useCallback(
    (value: Locale) =>
      navigation.navigate('WelcomeLanguages', {pickedLanguage: value}),
    [navigation],
  );
  return <PickLanguageContainer onSelect={onSelect} />;
});
