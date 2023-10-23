import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {PickLanguageContainer} from '../../containers/PickLanguageContainer';
import {RootStackBindingProps} from './RootStackBindingProps';
import {Language} from '../../core/Language';

export type PickLanguageForSettingsBindingProps =
  RootStackBindingProps<'PickLanguageForSettings'>;

export default observer(function PickLanguageForSettingsBinding(
  props: PickLanguageForSettingsBindingProps,
) {
  const {navigation} = props;
  const onSelect = useCallback(
    (value: Language) =>
      navigation.navigate('Root', {
        screen: 'Settings',
        params: {
          pickedLanguage: value,
        },
      }),
    [navigation],
  );
  return <PickLanguageContainer onSelect={onSelect} />;
});
