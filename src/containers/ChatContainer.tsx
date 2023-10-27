import React, {useCallback, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {ChatScreen} from '../screens/ChatScreen';
import Voice from '@react-native-voice/voice';
import {useRoot} from '../core/Root/hooks';
import {ChatService} from '../core/ChatService';
import {expr} from 'mobx-utils';
import {FULFILLED} from '../core/AsyncAtom';
import TrackPlayer, {Event} from 'react-native-track-player';
import {autorun} from 'mobx';
import {initial} from 'lodash';

export type ChatContainerProps = {
  chatId: string;
  getIsFocused(): boolean;
};

export const ChatContainer = observer(
  ({chatId, getIsFocused}: ChatContainerProps) => {
    const root = useRoot();
    const {textToSpeech, settings} = useRoot();
    const [service] = useState(() => new ChatService(root, chatId));
    const {chatInfoState, messagesState} = service;
    const [isSending, setIsSending] = useState(false);
    const [speechingMessage, setSpeechingMessage] = useState<number>();
    const [pressed, setPressed] = useState(false);
    const [value, setValue] = useState('');

    const handleChangeValue = useCallback(
      (v: string) => setValue(v.slice(0, 250)),
      [],
    );

    useEffect(() => {
      service.subscribe();
    }, [service]);
    useEffect(
      () =>
        autorun(() => {
          if (!getIsFocused()) {
            // noinspection JSIgnoredPromiseFromCall
            TrackPlayer.reset();
          }
        }),
      [getIsFocused],
    );
    useEffect(() => {
      Voice.onSpeechResults = result => {
        const newValue = result.value?.join() ?? '';
        handleChangeValue(newValue);
      };
      TrackPlayer.addEventListener(Event.PlaybackQueueEnded, () => {
        setSpeechingMessage(undefined);
      });
      return () => {
        Voice.destroy().then(Voice.removeAllListeners);
      };
    }, [handleChangeValue]);

    const start = useCallback(async () => {
      if (chatInfoState?.status !== FULFILLED) {
        return;
      }
      setPressed(true);
      await Voice.start(chatInfoState.result.language);
    }, [chatInfoState]);
    const end = useCallback(() => {
      setPressed(false);
      Voice.destroy().then(Voice.removeAllListeners);
    }, []);

    const originalMessages = expr(() =>
      messagesState?.status === FULFILLED ? messagesState.result : [],
    );
    const messages = expr(() => initial(originalMessages));

    const synthesize = useCallback(
      async (text: string) => {
        if (chatInfoState?.status !== FULFILLED) {
          return;
        }
        const uri = await textToSpeech.synthesize({
          text: text,
          languageCode: chatInfoState.result.language,
        });
        const track1 = {
          url: uri,
        };
        await TrackPlayer.reset();
        await TrackPlayer.add([track1]);
        await TrackPlayer.play();
      },
      [chatInfoState, textToSpeech],
    );

    const synthesizeByIndex = useCallback(
      async (index: number) => {
        if (chatInfoState?.status !== FULFILLED) {
          return;
        }
        setSpeechingMessage(index);
        const message = messages[index];
        await synthesize(message.content);
      },
      [chatInfoState, messages, synthesize],
    );

    const stop = useCallback(async () => {
      setSpeechingMessage(undefined);
      await TrackPlayer.reset();
    }, []);

    const sendMessage = useCallback(async () => {
      setIsSending(true);
      handleChangeValue('');
      const result = await service.sendMessage(value);
      if (settings.isAutomaticallyPlayed) {
        await synthesize(result.response);
        setSpeechingMessage(0);
      }
      setIsSending(false);
    }, [handleChangeValue, service, settings, synthesize, value]);

    return (
      <ChatScreen
        isSpeaking={pressed}
        onSpeechStartPress={start}
        onSpeechFinishPress={end}
        message={value}
        onChangeMessage={handleChangeValue}
        messages={messages}
        onSendMessagePress={sendMessage}
        onPausePress={stop}
        onSynthesize={synthesizeByIndex}
        isSending={isSending}
        speechingMessage={speechingMessage}
      />
    );
  },
);
