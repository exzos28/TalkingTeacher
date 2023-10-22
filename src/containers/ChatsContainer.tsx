import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {ChatsScreen} from '../screens/ChatsScreen';
import {useRoot} from '../core/Root/hooks';
import {FULFILLED} from '../core/AsyncAtom';

export type ChatsContainerProps = {
  goToCreateChat(): void;
  goToChat(chatId: string): void;
};

export const ChatsContainer = observer(
  ({goToCreateChat, goToChat}: ChatsContainerProps) => {
    const {chats} = useRoot();
    const getChats = useCallback(
      () => (chats.state?.status === FULFILLED ? chats.state.result : []),
      [chats],
    );
    return (
      <ChatsScreen
        getChats={getChats}
        onCreatePress={goToCreateChat}
        onChatPress={goToChat}
      />
    );
  },
);
