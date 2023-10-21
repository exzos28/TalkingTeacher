import React, {useCallback, useMemo, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {variance} from '../../core';
import {Button, Text} from '@ui-kitten/components';
import {useRoot, useStrings} from '../../core/Root/hooks';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SelectedLanguage} from './SelectedLanguage';
import {Gutter, Space} from '../../components/basic';
import {LANGUAGES} from '../../core/Localization/LANGUAGES';
import {Locale} from '../../core/Localization';
import {runInAction} from 'mobx';

export type OnboardingScreenProps = {
  pickLanguage(): Promise<Locale | undefined>;
};

export default observer(function OnboardingScreen({
  pickLanguage,
}: OnboardingScreenProps) {
  const {translation, preferences} = useRoot();
  const strings = useStrings();
  const values = useMemo(() => [...LANGUAGES.values()], []);
  const keys = useMemo(() => [...LANGUAGES.keys()], []);
  const findNextLanguage = useCallback(
    (current: number) => (current === keys.length - 1 ? 0 : current + 1),
    [keys],
  );
  const [currentLanguage, setCurrentLanguage] = useState(() =>
    values.findIndex((_, index) => keys[index] === translation.locale),
  );
  const [nextLanguage, setNextLanguage] = useState(() =>
    findNextLanguage(currentLanguage),
  );

  const handlePickCurrentLanguage = useCallback(async () => {
    const picked = await pickLanguage();
    if (picked === undefined) {
      return;
    }
    const newCurrent = values.findIndex(_ => _.value === picked);
    setCurrentLanguage(newCurrent);
    await runInAction(() => preferences.setLocale(picked));
    setNextLanguage(findNextLanguage(newCurrent));
  }, [findNextLanguage, pickLanguage, preferences, values]);
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
            {strings['onboarding.step1.title1']}
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
            {strings['onboarding.step1.title2']}
          </TitleText>
          <SelectedLanguage
            label={nextSelected.text}
            Icon={nextSelected.Icon}
            onPress={handlePickNextLanguage}
          />
        </Space>
      </ContentSpace>
      <NextButton onPress={() => {}} size="medium">
        {strings['onboarding.step1.button']}
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
    fontSize: 28,
  },
}));
