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
import {Message as MessageComponent} from './Message';
import {range} from 'lodash';
import {nanoid} from 'nanoid/non-secure';

export type ChatScreenProps = {
  isSpeaking: boolean;
  onSpeechStart(): void;
  onSpeechFinish(): void;
  message: string;
  onChangeMessage(message: string): void;
};

const TEXT =
  'To create a small application where you can interact with me and send new messages, you will need to combine the use of the GPT-3.5 (or other version) API with UI and backend development for your application. ';

const MESSAGES: Message[] = range(10).map(_ =>
  _ % 2
    ? {text: TEXT, id: nanoid(10), from: 'user'}
    : {text: TEXT, id: nanoid(10), from: 'assistant'},
);

type Message = {id: string; text: string; from: 'user' | 'assistant'};

export const ChatScreen = observer(
  ({
    onSpeechFinish,
    onSpeechStart,
    isSpeaking,
    message,
    onChangeMessage,
  }: ChatScreenProps) => {
    const renderItem = useCallback(
      ({item}: {item: Message}) => (
        <MessageComponent
          inverted={item.from === 'user'}
          text={item.text}
          playPossible={item.from === 'assistant'}
          isPlaying={false}
        />
      ),
      [],
    );
    const theme = useTheme();
    return (
      <RootLayout level="4">
        <RootSafeAreaView edges={['bottom']}>
          <FlatList
            contentContainerStyle={styles.container}
            inverted
            data={MESSAGES}
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
