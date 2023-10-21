import React from 'react';
import {observer} from 'mobx-react-lite';
import {Layout} from '@ui-kitten/components';
import {variance} from '../../core';
import LanguageList from './LanguageList';
import {Locale} from '../../core/Localization';

export type PickLanguageScreenProps = {
  onSelect(locale: Locale): void;
  selected?: Locale;
};

export default observer(function PickLanguageScreen({
  onSelect,
  selected,
}: PickLanguageScreenProps) {
  return (
    <RootLayout level="1">
      <LanguageList onSelect={onSelect} selected={selected} />
    </RootLayout>
  );
});

const RootLayout = variance(Layout)(() => ({
  root: {
    flex: 1,
  },
}));
