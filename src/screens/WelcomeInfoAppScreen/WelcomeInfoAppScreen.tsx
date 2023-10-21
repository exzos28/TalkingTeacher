import React from 'react';
import {observer} from 'mobx-react-lite';
import {variance} from '../../core';
import {Button, Text} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Gutter, Space} from '../../components/basic';

export type WelcomeInfoAppScreenProps = {
  onNextPress(): void;
};

export default observer(function WelcomeInfoAppScreen({
  onNextPress,
}: WelcomeInfoAppScreenProps) {
  return (
    <RootSaveAreaView>
      <ContentSpace gutter={Gutter.Large}>
        <Space gutter={Gutter.Middle}>
          <TitleText category="s1">Привет 👋</TitleText>
        </Space>
        <Space gutter={Gutter.Middle}>
          <TitleText category="s1">
            Это виртуальный помощник, который может поддержать разговор или чат
            абсолютно на любую тему, а также исправить твои грамматические
            ошибки.
          </TitleText>
        </Space>
      </ContentSpace>
      <NextButton onPress={onNextPress} size="medium">
        Продолжить
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
    fontSize: 16,
  },
}));
