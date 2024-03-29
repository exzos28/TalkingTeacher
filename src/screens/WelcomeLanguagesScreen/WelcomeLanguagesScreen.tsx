import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {
  convertLanguageToLocale,
  convertLocaleToLanguage,
  Language,
  variance,
} from '../../core';
import {Button, Text} from '@ui-kitten/components';
import {useRoot, useStrings} from '../../core/Root/hooks';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SelectedLanguage} from './SelectedLanguage';
import {Gutter, Space} from '../../components/basic';
import {LANGUAGES} from '../../DATA';

export type WelcomeLanguagesScreenProps = {
  pickLanguage(): Promise<Language | undefined>;
  onNextPress(): void;
};

export default observer(function WelcomeLanguagesScreen({
  pickLanguage,
  onNextPress,
}: WelcomeLanguagesScreenProps) {
  const {translation, preferences, settings} = useRoot();
  const strings = useStrings();
  const values = useMemo(() => [...LANGUAGES.values()], []);
  const keys = useMemo(() => [...LANGUAGES.keys()], []);
  const findNextLanguage = useCallback(
    (current: number) => (current === keys.length - 1 ? 0 : current + 1),
    [keys],
  );
  const [currentLanguage, setCurrentLanguage] = useState(() =>
    values.findIndex(
      (_, index) => keys[index] === convertLocaleToLanguage(translation.locale),
    ),
  );
  const [nextLanguage, setNextLanguage] = useState(() => {
    const enIndex = values.findIndex(_ => _.value === Language.English);
    if (currentLanguage === enIndex) {
      return findNextLanguage(currentLanguage);
    }
    return enIndex;
  });

  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    settings.setStudiedLanguage(values[nextLanguage].value);
  }, [nextLanguage, settings, values]);

  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    preferences.setLocale(
      convertLanguageToLocale(values[currentLanguage].value),
    );
  }, [currentLanguage, nextLanguage, preferences, values]);

  const handlePickCurrentLanguage = useCallback(async () => {
    const picked = await pickLanguage();
    if (picked === undefined) {
      return;
    }
    const newCurrent = values.findIndex(_ => _.value === picked);
    setCurrentLanguage(newCurrent);
    setNextLanguage(findNextLanguage(newCurrent));
  }, [findNextLanguage, pickLanguage, values]);
  const handlePickNextLanguage = useCallback(async () => {
    const picked = await pickLanguage();
    if (picked === undefined) {
      return;
    }
    const newNext = values.findIndex(_ => _.value === picked);
    if (newNext === currentLanguage) {
      setCurrentLanguage(findNextLanguage(newNext));
    }
    setNextLanguage(newNext);
  }, [currentLanguage, findNextLanguage, pickLanguage, values]);
  const currentSelected = values[currentLanguage];
  const nextSelected = values[nextLanguage];
  return (
    <RootSaveAreaView>
      <ContentSpace gutter={Gutter.Large}>
        <Space gutter={Gutter.Middle}>
          <TitleText category="s1">
            {strings['welcomeLanguages.title1']}
          </TitleText>
          <SelectedLanguage
            label={currentSelected.text}
            Icon={currentSelected.Icon}
            second
            onPress={handlePickCurrentLanguage}
          />
        </Space>
        <Space gutter={Gutter.Middle}>
          <TitleText category="s1">
            {strings['welcomeLanguages.title2']}
          </TitleText>
          <SelectedLanguage
            label={nextSelected.text}
            Icon={nextSelected.Icon}
            onPress={handlePickNextLanguage}
          />
        </Space>
      </ContentSpace>
      <NextButton onPress={onNextPress} size="medium">
        {strings['welcomeLanguages.start']}
      </NextButton>
    </RootSaveAreaView>
  );
});

const RootSaveAreaView = variance(SafeAreaView)(theme => ({
  root: {
    flex: 1,
    backgroundColor: theme.palette['background-basic-color-1'],
    padding: 20,
    justifyContent: 'center',
  },
}));

const ContentSpace = variance(Space)(() => ({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
}));

const NextButton = variance(Button)(() => ({
  root: {
    marginTop: 30,
  },
}));

const TitleText = variance(Text)(() => ({
  root: {
    fontSize: 20,
  },
}));
