import React from 'react';
import {observer} from 'mobx-react-lite';
import {Layout, Text} from '@ui-kitten/components';
import {sized, useTheme, variance} from '../../core';
import {RectButton} from 'react-native-gesture-handler';
import {useDifficulty} from '../../useDifficulty';
import {PADDING} from '../constants';
import {View} from 'react-native';
import {Gutter, Space} from '../../components/basic';
import {AngleRightSvg} from '../../assets/svg/colorless';
import {LANGUAGES} from '../../DATA';
import {Chat} from '../../core/ChatService';

export type ChatItemProps = {
  item: Chat;
  onPress(): void;
};

export const ChatItem = observer(({item, onPress}: ChatItemProps) => {
  const difficultyValues = useDifficulty();
  const theme = useTheme();
  const language = LANGUAGES.get(item.language)?.text ?? '';
  return (
    <RootLayout>
      <RectButton onPress={onPress}>
        <ContentView>
          <Space gutter={Gutter.Tiny}>
            <TitleText category="c2">{item.topic}</TitleText>
            <Text category="c1">
              {language} • {difficultyValues[item.difficulty]}
            </Text>
          </Space>
          <AngleRightIcon color={theme.palette['color-primary-400']} />
        </ContentView>
      </RectButton>
    </RootLayout>
  );
});

const AngleRightIcon = sized(AngleRightSvg, 15);

const RootLayout = variance(Layout)(() => ({
  root: {
    flex: 1,
  },
}));

const ContentView = variance(View)(() => ({
  root: {
    paddingHorizontal: PADDING,
    paddingVertical: PADDING / 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const TitleText = variance(Text)(() => ({
  root: {
    fontSize: 16,
  },
}));
