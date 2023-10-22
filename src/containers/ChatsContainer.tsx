import React from 'react';
import {observer} from 'mobx-react-lite';
import {ChatsScreen} from '../screens/ChatsScreen';

export type ChatsContainerProps = {
  goToCreateChat(): void;
  goToChat(): void;
};

export const ChatsContainer = observer(
  ({goToCreateChat, goToChat}: ChatsContainerProps) => {
    return (
      <ChatsScreen onCreatePress={goToCreateChat} onChatPress={goToChat} />
    );
  },
);
