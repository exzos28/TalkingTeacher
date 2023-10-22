import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {
  CreateChatScreen,
  CreateChatValues,
} from '../../screens/CreateChatScreen';
import {RootStackBindingProps} from './RootStackBindingProps';
import {Alert} from 'react-native';

export type CreateChatBinding = RootStackBindingProps<'CreateChat'>;

export default observer(function CreateChatBinding({}: CreateChatBinding) {
  const submit = useCallback((values: CreateChatValues) => {
    Alert.alert('Values', JSON.stringify(values, null, 1));
  }, []);
  return <CreateChatScreen onSubmit={submit} />;
});
