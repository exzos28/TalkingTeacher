import React from 'react';
import {observer} from 'mobx-react-lite';
import {Layout} from '@ui-kitten/components';
import {sized, variance} from '../../core';
import {Menu, MenuGroup, MenuItem, MenuItemIcon} from '../../components/Menu';
import {
  BellRingSvg,
  HeadsetSvg,
  StarSvg,
  CircleSvg,
  SquareSvg,
  BarChartSvg,
} from '../../assets/svg/colorless';
import {PADDING} from '../constants';
import {LANGUAGES} from '../../DATA';
import {ChatType} from '../../types';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {Language} from '../../core';
import {useStrings} from '../../core/Root/hooks';
import {Text} from '@ui-kitten/components';

export type SettingsScreenProps = {
  goToWriteUs: () => void;
  goToRateApp: () => void;
  currentLanguage: Language;
  studiedLanguage: Language;
  chatType: ChatType;
  isAutomaticallyPlayed: boolean;

  onPickCurrentLanguagePress(): void;
  onPickStudiedLanguagePress(): void;
  onChatTypePress(): void;
  onIsAutomaticallyPlayedPress(): void;
};

export default observer(function SettingsScreen(props: SettingsScreenProps) {
  const {
    currentLanguage,
    studiedLanguage,
    // chatType,
    isAutomaticallyPlayed,
    goToWriteUs,
    goToRateApp,
    onPickCurrentLanguagePress,
    onPickStudiedLanguagePress,
    // onChatTypePress,
    onIsAutomaticallyPlayedPress,
  } = props;
  const strings = useStrings();
  const LocaleIcon = LANGUAGES.get(currentLanguage)?.Icon;
  const StudiedIcon = LANGUAGES.get(studiedLanguage)?.Icon;
  return (
    <RootView level="1">
      <ScrollView contentContainerStyle={styles.container}>
        <Menu>
          <MenuGroup title={strings['settings.languages.title']}>
            <MenuItem
              title={strings['settings.languages.ISpeak']}
              subtitle={strings['settings.languages.ISpeak.helper']}
              left={<MenuItemIcon Icon={CircleIcon} />}
              onPress={onPickCurrentLanguagePress}
              right={LocaleIcon && <MenuItemIcon Icon={LocaleIcon} />}
            />
            <MenuItem
              title={strings['settings.languages.IWantToPractice']}
              left={<MenuItemIcon Icon={SquareIcon} />}
              onPress={onPickStudiedLanguagePress}
              right={StudiedIcon && <MenuItemIcon Icon={StudiedIcon} />}
            />
          </MenuGroup>
          <MenuGroup title={strings['settings.chat.title']}>
            {/*<MenuItem*/}
            {/*  disabled*/}
            {/*  title={strings['settings.chat.chatType']}*/}
            {/*  left={<MenuItemIcon Icon={BarCharIcon} />}*/}
            {/*  onPress={onChatTypePress}*/}
            {/*  right={*/}
            {/*    <Text>*/}
            {/*      {chatType === ChatType.Chat*/}
            {/*        ? strings['settings.chat.chatType.chat']*/}
            {/*        : strings['settings.chat.chatType.audioOnly']}*/}
            {/*    </Text>*/}
            {/*  }*/}
            {/*/>*/}
            <MenuItem
              title={strings['settings.chat.audio']}
              left={<MenuItemIcon Icon={SquareIcon} />}
              onPress={onIsAutomaticallyPlayedPress}
              right={
                <Text>
                  {isAutomaticallyPlayed
                    ? strings['settings.chat.audio.yes']
                    : strings['settings.chat.audio.no']}
                </Text>
              }
            />
          </MenuGroup>
          <MenuGroup title={strings['settings.helpful.title']}>
            {/*<MenuItem*/}
            {/*  title={strings['settings.helpful.notifications']}*/}
            {/*  left={<MenuItemIcon Icon={BellIcon} />}*/}
            {/*  right={<Toggle onPress={() => {}} />}*/}
            {/*/>*/}
            <MenuItem
              onPress={goToRateApp}
              title={strings['settings.helpful.rateTheApp']}
              left={<MenuItemIcon Icon={StarIcon} />}
            />
            <MenuItem
              onPress={goToWriteUs}
              title={strings['settings.helpful.writeToUs']}
              left={<MenuItemIcon Icon={HeadsetIcon} />}
            />
          </MenuGroup>
        </Menu>
      </ScrollView>
    </RootView>
  );
});

const BellIcon = sized(BellRingSvg, 22);
const HeadsetIcon = sized(HeadsetSvg, 20);
const StarIcon = sized(StarSvg, 20);
const CircleIcon = sized(CircleSvg, 20);
const SquareIcon = sized(SquareSvg, 20);
const BarCharIcon = sized(BarChartSvg, 20);

const RootView = variance(Layout)(() => ({
  root: {
    flex: 1,
  },
}));

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: PADDING,
  },
});
