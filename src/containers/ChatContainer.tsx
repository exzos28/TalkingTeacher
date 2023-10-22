import React, {useCallback, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {ChatScreen} from '../screens/ChatScreen';
import Voice from '@react-native-voice/voice';
import {SpeechResultsEvent} from '@react-native-voice/voice';
import {useRoot} from '../core/Root/hooks';
import {ChatService} from '../core/ChatsService';
import {expr} from 'mobx-utils';
import {FULFILLED} from '../core/AsyncAtom';

export type ChatContainerProps = {
  chatId: string;
};

export const ChatContainer = observer(({chatId}: ChatContainerProps) => {
  const root = useRoot();
  const [service] = useState(() => new ChatService(root, chatId));
  const {chatInfoState, messagesState} = service;
  useEffect(() => {
    service.subscribe();
  }, [service]);
  const [pressed, setPressed] = useState(false);
  const [value, setValue] = useState('');
  const onSpeechResultsHandler = useCallback((result: SpeechResultsEvent) => {
    const newValue = result.value?.join() ?? '';
    setValue(newValue);
  }, []);
  useEffect(() => {
    Voice.onSpeechResults = onSpeechResultsHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [onSpeechResultsHandler]);
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

  const messages = expr(() => originalMessages);

  const sendMessage = useCallback(async () => {
    const newMessages = originalMessages.map(_ => ({
      role: _.role,
      content: _.content,
    }));
    newMessages.push({role: 'user', content: value});
    await service.addMessage(value, 'user');
    console.log('messages', newMessages.length);
    setValue('');
    const response = await fetch('http://3.70.155.81:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMessages),
    });
    const data = await response.json();
    console.log(data);
    const content = data.message.content;
    await service.addMessage(content, 'assistant');
  }, [originalMessages, service, value]);

  return (
    <ChatScreen
      isSpeaking={pressed}
      onSpeechStart={start}
      onSpeechFinish={end}
      message={value}
      onChangeMessage={setValue}
      messages={messages}
      onSendMessagePress={sendMessage}
    />
  );
});
