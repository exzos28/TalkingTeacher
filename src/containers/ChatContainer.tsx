import React, {useCallback, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {ChatScreen} from '../screens/ChatScreen';
import Voice from '@react-native-voice/voice';
import {SpeechResultsEvent} from '@react-native-voice/voice/src/VoiceModuleTypes';

export const ChatContainer = observer(() => {
  const [pressed, setPressed] = useState(false);
  const [value, setValue] = useState('');
  const onSpeechResultsHandler = useCallback((result: SpeechResultsEvent) => {
    console.log(result);
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
    console.log('start');
    setPressed(true);
    await Voice.start('ru');
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
