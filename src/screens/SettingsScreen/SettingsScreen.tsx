import React from 'react';
import {observer} from 'mobx-react-lite';
import {Layout, Toggle, Text} from '@ui-kitten/components';
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
import {Locale} from '../../core/Localization';
import {ChatType} from '../../types';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

export type SettingsScreenProps = {
  goToWriteUs: () => void;
  goToRateApp: () => void;
  currentLanguage: string;
  studiedLanguage: string;
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
    chatType,
    isAutomaticallyPlayed,
    goToWriteUs,
    goToRateApp,
    onPickCurrentLanguagePress,
    onPickStudiedLanguagePress,
    onChatTypePress,
    onIsAutomaticallyPlayedPress,
  } = props;
  const LocaleIcon = LANGUAGES.get(currentLanguage as Locale)?.Icon;
  const StudiedIcon = LANGUAGES.get(studiedLanguage as Locale)?.Icon;
  return (
    <RootView level="1">
      <ScrollView contentContainerStyle={styles.container}>
        <Menu>
          <MenuGroup title="Languages">
            <MenuItem
              title="I speak"
              left={<MenuItemIcon Icon={CircleIcon} />}
              onPress={onPickCurrentLanguagePress}
              right={LocaleIcon && <MenuItemIcon Icon={LocaleIcon} />}
            />
            <MenuItem
              title="I want to practice"
              left={<MenuItemIcon Icon={SquareIcon} />}
              onPress={onPickStudiedLanguagePress}
              right={StudiedIcon && <MenuItemIcon Icon={StudiedIcon} />}
            />
          </MenuGroup>
          <MenuGroup title="Chat">
            <MenuItem
              disabled
              title="Chat type"
              left={<MenuItemIcon Icon={BarCharIcon} />}
              onPress={onChatTypePress}
              right={
                <Text>
                  {chatType === ChatType.Chat ? 'Chat' : 'Audio only'}
                </Text>
              }
            />
            <MenuItem
              title="Audio is automatically played"
              left={<MenuItemIcon Icon={SquareIcon} />}
              onPress={onIsAutomaticallyPlayedPress}
              right={<Text>{isAutomaticallyPlayed ? 'Yes' : 'No'}</Text>}
            />
          </MenuGroup>
          <MenuGroup title="Helpful">
            <MenuItem
              title="Notifications"
              left={<MenuItemIcon Icon={BellIcon} />}
              right={<Toggle onPress={() => {}} />}
            />
            <MenuItem
              onPress={goToRateApp}
              title="Rate the app"
              left={<MenuItemIcon Icon={StarIcon} />}
            />
            <MenuItem
              onPress={goToWriteUs}
              title="Write to us"
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
