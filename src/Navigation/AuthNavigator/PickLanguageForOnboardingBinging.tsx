import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {PickLanguageScreen} from '../../screens/PickLanguageScreen';
import {AuthStackBindingProps} from './AuthStackBindingProps';
import {Locale} from '../../core/Localization';

export type PickLanguageForWelcomeStep1BindingProps =
  AuthStackBindingProps<'PickLanguageForWelcomeStep1'>;

export default observer(function PickLanguageForWelcomeStep1Binding(
  props: PickLanguageForWelcomeStep1BindingProps,
) {
  const {navigation} = props;
  const onSelect = useCallback(
    (value: Locale) =>
      navigation.navigate('WelcomeStep1', {pickedLanguage: value}),
    [navigation],
  );
  return <PickLanguageScreen onSelect={onSelect} />;
});
