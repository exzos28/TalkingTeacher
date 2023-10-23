import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {AuthStackBindingProps} from './AuthStackBindingProps';
import {PickLanguageContainer} from '../../containers/PickLanguageContainer';
import {Language} from '../../core/Language';

export type PickLanguageForWelcomeStep1BindingProps =
  AuthStackBindingProps<'PickLanguageForWelcomeLanguages'>;

export default observer(function PickLanguageForWelcomeLanguagesBinding(
  props: PickLanguageForWelcomeStep1BindingProps,
) {
  const {navigation} = props;
  const onSelect = useCallback(
    (value: Language) =>
      navigation.navigate('WelcomeLanguages', {pickedLanguage: value}),
    [navigation],
  );
  return <PickLanguageContainer onSelect={onSelect} />;
});
