import React, {useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, RectButton} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import {Input, Layout} from '@ui-kitten/components';
import {sized, useTheme, variance} from '../../core';
import {PADDING} from '../constants';
import {ArrowRightSvg} from '../../assets/svg/colorless';
import {HoldSpeechButton} from './HoldSpeechButton';
import {observer} from 'mobx-react-lite';

export type ChatScreenProps = {
  isSpeaking: boolean;
  onSpeechStart(): void;
  onSpeechFinish(): void;
  message: string;
  onChangeMessage(message: string): void;
};

export const ChatScreen = observer(
  ({
    onSpeechFinish,
    onSpeechStart,
    isSpeaking,
    message,
    onChangeMessage,
  }: ChatScreenProps) => {
    const renderItem = useCallback(() => null, []);
    const theme = useTheme();
    return (
      <RootLayout level="4">
        <RootSafeAreaView>
          <FlatList
            contentContainerStyle={styles.container}
            inverted
            data={[]}
            renderItem={renderItem}
          />
          <FooterView>
            <View>
              <Input
                value={message}
                onChangeText={onChangeMessage}
                textStyle={styles.input}
                placeholder="Typing..."
                multiline
              />
              {message ? (
                <SendButtonView>
                  <SendButton hitSlop={10}>
                    <ArrowRightIcon
                      color={theme.palette['color-primary-500']}
                    />
                  </SendButton>
                </SendButtonView>
              ) : null}
            </View>
            <SpeakButtonView>
              <HoldSpeechButton
                onSpeechFinish={onSpeechFinish}
                onSpeechStart={onSpeechStart}
                isSpeaking={isSpeaking}
              />
            </SpeakButtonView>
          </FooterView>
        </RootSafeAreaView>
      </RootLayout>
    );
  },
);

const RootLayout = variance(Layout)(() => ({
  root: {
    flex: 1,
  },
}));

const ArrowRightIcon = sized(ArrowRightSvg, 20);

const SEND_BUTTON_SIZE = 35;
const SEND_BUTTON_RIGHT_PADDING = 10;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  input: {
    minHeight: 50,
    paddingRight: SEND_BUTTON_SIZE + SEND_BUTTON_RIGHT_PADDING,
  },
});

const RootSafeAreaView = variance(SafeAreaView)(() => ({
  root: {
    flex: 1,
  },
}));

const SendButtonView = variance(View)(() => ({
  root: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: SEND_BUTTON_RIGHT_PADDING,
  },
}));

const SendButton = variance(RectButton)(() => ({
  root: {
    width: SEND_BUTTON_SIZE,
    height: SEND_BUTTON_SIZE,
    borderRadius: SEND_BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const SpeakButtonView = variance(View)(() => ({
  root: {
    padding: PADDING,
  },
}));

const FooterView = variance(View)(() => ({
  root: {
    marginTop: 'auto',
  },
}));
