import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {SettingsScreen} from '../../screens/SettingsScreen';
import {useGoToMarketReviews} from '../../core/Market/useGoToMarket';
import {Url} from '../../core';
import {useRoot} from '../../core/Root/hooks';
import {Locale} from '../../core/Localization';
import {RootStackBindingProps} from './RootStackBindingProps';

export type SettingsBindingProps = RootStackBindingProps<'Settings'>;

export default observer(function SettingsBinding(props: SettingsBindingProps) {
  const {navigation} = props;
  const {
    location,
    configuration: {values},
    preferences: {locale},
  } = useRoot();
  const goToChooseLanguage = useCallback(() => {
    navigation.navigate('ChangeLanguage');
  }, [navigation]);
  const goToWriteUs = useCallback(async () => {
    const url = 'mailto:likesfaster47@gmail.com' as Url;
    await location.open(url);
  }, [location]);
  const goToQuiz = useCallback(async () => {
    let url;
    switch (locale) {
      case Locale.German:
        url = values.quizLinkGe;
        break;
      case Locale.Russian:
        url = values.quizLinkRu;
        break;
      case Locale.English:
      default:
        url = values.quizLinkEn;
    }
    await location.open(url);
  }, [locale, location, values]);
  const goToReview = useGoToMarketReviews();

  return (
    <SettingsScreen
      goToChooseLanguage={goToChooseLanguage}
      goToWriteUs={goToWriteUs}
      goToRateApp={goToReview}
      goToQuiz={goToQuiz}
    />
  );
});
