import React from 'react';
import {observer} from 'mobx-react-lite';
import {Layout} from '@ui-kitten/components';
import {variance} from '../../core';
import LanguageList from './LanguageList';
import {Language} from '../../core';

export type PickLanguageScreenProps = {
  onSelect(language: Language): void;
  selected?: Language;
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
