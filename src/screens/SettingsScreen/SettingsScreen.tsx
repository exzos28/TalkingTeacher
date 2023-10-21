import React from 'react';
import {observer} from 'mobx-react-lite';
import {Button, Divider, Icon, IconProps, Layout} from '@ui-kitten/components';
import {useTheme, variance} from '../../core';
import ListItem from './ListItem';
import {expr} from 'mobx-utils';
import {View} from 'react-native';
import {useRoot, useStrings} from '../../core/Root/hooks';
import {LANGUAGES} from '../../core/Localization/LANGUAGES';

export type SettingsScreenProps = {
  goToChooseLanguage: () => void;
  goToWriteUs: () => void;
  goToRateApp: () => void;
  goToQuiz: () => void;
};

export default observer(function SettingsScreen(props: SettingsScreenProps) {
  const {goToChooseLanguage, goToWriteUs, goToRateApp, goToQuiz} = props;
  const {translation} = useRoot();
  const strings = useStrings();
  const selectedLocale = expr(() =>
    LANGUAGES.find(_ => _.value === translation.locale),
  );
  const LanguageIcon = selectedLocale?.Icon;
  return (
    <RootView level="1">
      <ListItem
        onPress={goToChooseLanguage}
        title={strings['settings.language']}
        accessoryRight={LanguageIcon}
      />
      <Divider />
      <ListItem
        onPress={goToWriteUs}
        title={strings['settings.writeToUs']}
        accessoryRight={MailIcon}
      />
      <Divider />
      <ListItem
        onPress={goToRateApp}
        title={strings['settings.rateTheApp']}
        accessoryRight={RateAppIcon}
      />
      <Divider />
      <ListItem
        onPress={goToQuiz}
        title={strings['settings.quiz']}
        description={strings['settings.quiz.helper']}
        accessoryRight={FileTextIcon}
      />
      <FooterView>
        <LogOutButton
          onPress={() => {}}
          size="large"
          appearance="outline"
          status="danger">
          {strings['settings.logOut']}
        </LogOutButton>
      </FooterView>
    </RootView>
  );
});

const RootView = variance(Layout)(() => ({
  root: {
    flex: 1,
  },
}));

const FooterView = variance(View)(() => ({
  root: {
    padding: 15,
  },
}));

const LogOutButton = variance(Button)(() => ({
  root: {
    marginTop: 50,
  },
}));

export const RateAppIcon = (props: IconProps) => {
  const theme = useTheme();
  return (
    <Icon
      name="star"
      {...props}
      width={30}
      height={30}
      fill={theme.palette['color-warning-400']}
    />
  );
};
export const FileTextIcon = (props: IconProps) => {
  const theme = useTheme();
  return (
    <Icon
      name="file-text-outline"
      {...props}
      width={30}
      height={30}
      fill={theme.palette['color-info-500']}
    />
  );
};

export const MailIcon = (props: IconProps) => {
  const theme = useTheme();
  return (
    <Icon
      name="email-outline"
      {...props}
      width={30}
      height={30}
      fill={theme.palette['color-info-600']}
    />
  );
};
