import React, {useCallback, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {ChatScreen} from '../screens/ChatScreen';
import Voice from '@react-native-voice/voice';
import {SpeechResultsEvent} from '@react-native-voice/voice';

export const ChatContainer = observer(() => {
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
    setPressed(true);
    await Voice.start('en');
  }, []);
  const end = useCallback(() => {
    setPressed(false);
    Voice.destroy().then(Voice.removeAllListeners);
  }, []);
  return (
    <ChatScreen
      isSpeaking={pressed}
      onSpeechStart={start}
      onSpeechFinish={end}
      message={value}
      onChangeMessage={setValue}
    />
  );
});
