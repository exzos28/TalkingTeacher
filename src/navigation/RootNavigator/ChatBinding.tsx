import React from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from './RootStackBindingProps';
import {ChatContainer} from '../../containers/ChatContainer';
import {useNavigationGetIsFocused} from '../../core/Navigation';

export type ChatBinding = RootStackBindingProps<'Chat'>;

export default observer(function ChatBinding({route}: ChatBinding) {
  const chatId = route.params.chatId;
  const getIsFocused = useNavigationGetIsFocused();
  return <ChatContainer getIsFocused={getIsFocused} chatId={chatId} />;
});
