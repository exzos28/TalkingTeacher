import React from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from './RootStackBindingProps';
import {ChatContainer} from '../../containers/ChatContainer';

export type ChatBinding = RootStackBindingProps<'Chat'>;

export default observer(function ChatBinding({route}: ChatBinding) {
  const chatId = route.params.chatId;
  return <ChatContainer chatId={chatId} />;
});
