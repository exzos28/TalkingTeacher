import React, {useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, RectButton} from 'react-native-gesture-handler';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {Input, Layout} from '@ui-kitten/components';
import {sized, useTheme, variance} from '../../core';
import {PADDING} from '../constants';
import {ArrowUpSvg} from '../../assets/svg/colorless';
import {HoldSpeechButton} from './HoldSpeechButton';
import {observer} from 'mobx-react-lite';
import {Message as MessageComponent} from './Message';
import {Message} from '../../core/ChatService';
import LottieView from 'lottie-react-native';
import {useStrings} from '../../core/Root/hooks';

export type ChatScreenProps = {
  isSpeaking: boolean;
  isSending: boolean;
  speechingMessage: number | undefined;
  onSpeechStartPress(): void;
  onSpeechFinishPress(): void;
  message: string;
  onChangeMessage(message: string): void;
  messages: Message[];
  onSendMessagePress(): void;
  onSynthesize(index: number): void;
  onPausePress(): void;
};

export const ChatScreen = observer(
  ({
    onSpeechFinishPress,
    onSpeechStartPress,
    isSpeaking,
    isSending,
    speechingMessage,
    message,
    onChangeMessage,
    messages,
    onSendMessagePress,
    onSynthesize,
    onPausePress,
  }: ChatScreenProps) => {
    const strings = useStrings();
    const renderItem = useCallback(
      ({item, index}: {item: Message; index: number}) => (
        <MessageComponent
          inverted={item.role === 'user'}
          text={item.content}
          playPossible={item.role === 'assistant'}
          isPlaying={speechingMessage === index}
          onPlayPress={() => onSynthesize(index)}
          onPausePress={onPausePress}
        />
      ),
      [onPausePress, onSynthesize, speechingMessage],
    );
    const theme = useTheme();
    return (
      <RootLayout level="4">
        <KeyboardAvoidingView
          style={styles.keyboardView}
          enabled={Platform.OS === 'ios'}
          behavior="padding">
          <RootSafeAreaView edges={['bottom']}>
            <FlatList
              keyboardShouldPersistTaps="always"
              contentContainerStyle={styles.container}
              inverted
              data={messages}
              renderItem={renderItem}
            />
            <FooterView>
              <View>
                <Input
                  disabled={isSpeaking}
                  value={message}
                  onChangeText={onChangeMessage}
                  textStyle={styles.input}
                  placeholder={strings['chat.typing']}
                  multiline
                />
                {message ? (
                  <SendButtonView>
                    <SendButton onPress={onSendMessagePress} hitSlop={10}>
                      <ArrowRightIcon
                        color={theme.palette['color-primary-500']}
                      />
                    </SendButton>
                  </SendButtonView>
                ) : isSending ? (
                  <SendButtonView>
                    <SendButton onPress={onSendMessagePress} hitSlop={10}>
                      <LottieView
                        style={{
                          width: SEND_BUTTON_SIZE,
                          height: SEND_BUTTON_SIZE,
                        }}
                        source={require('../../assets/lottie/chat-loading.json')}
                        autoPlay
                        loop
                      />
                    </SendButton>
                  </SendButtonView>
                ) : null}
              </View>
              <SpeakButtonView>
                <HoldSpeechButton
                  onSpeechFinishPress={onSpeechFinishPress}
                  onSpeechStartPress={onSpeechStartPress}
                  isSpeaking={isSpeaking}
                />
              </SpeakButtonView>
            </FooterView>
          </RootSafeAreaView>
        </KeyboardAvoidingView>
      </RootLayout>
    );
  },
);

const RootLayout = variance(Layout)(() => ({
  root: {
    flex: 1,
  },
}));

const ArrowRightIcon = sized(ArrowUpSvg, 20);

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
  keyboardView: {
    flex: 1,
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
