import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {SettingsScreen} from '../screens/SettingsScreen';
import {useOpenReview} from '../core/StoreReview';
import {Url} from '../core';
import {useRoot} from '../core/Root/hooks';
import {Locale} from '../core/Localization';
import {ChatType} from '../types';

export type SettingsContainerProps = {
  pickLanguage(): Promise<Locale | undefined>;
};

export default observer(function SettingsContainer({
  pickLanguage,
}: SettingsContainerProps) {
  const review = useOpenReview();
  const {
    location,
    configuration,
    preferences,
    settings,
    translation: {locale},
  } = useRoot();

  const currentLanguage = locale;
  const {
    studiedLanguage,
    chatType,
    isAutomaticallyPlayed,
    setChatType,
    setIsAutomaticallyPlayed,
    setStudiedLanguage,
  } = settings;

  const goToWriteUs = useCallback(async () => {
    const url = `mailto:${configuration.values.feedbackMail}` as Url;
    await location.open(url);
  }, [configuration, location]);

  const pickCurrentLanguage = useCallback(async () => {
    const language = await pickLanguage();
    if (language) {
      await preferences.setLocale(language);
    }
  }, [pickLanguage, preferences]);

  const pickStudiedLanguage = useCallback(async () => {
    const language = await pickLanguage();
    if (language) {
      await setStudiedLanguage(language);
    }
  }, [pickLanguage, setStudiedLanguage]);

  const nextChatType = useCallback(async () => {
    const next = chatType === ChatType.Chat ? ChatType.Audio : ChatType.Chat;
    await setChatType(next);
  }, [chatType, setChatType]);
  const nextIsAutomaticallyPlayed = useCallback(
    () => setIsAutomaticallyPlayed(!isAutomaticallyPlayed),
    [isAutomaticallyPlayed, setIsAutomaticallyPlayed],
  );

  return (
    <SettingsScreen
      goToWriteUs={goToWriteUs}
      goToRateApp={review}
      currentLanguage={currentLanguage}
      studiedLanguage={studiedLanguage}
      chatType={chatType}
      isAutomaticallyPlayed={isAutomaticallyPlayed}
      onChatTypePress={nextChatType}
      onIsAutomaticallyPlayedPress={nextIsAutomaticallyPlayed}
      onPickCurrentLanguagePress={pickCurrentLanguage}
      onPickStudiedLanguagePress={pickStudiedLanguage}
    />
  );
});