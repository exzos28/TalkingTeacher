import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from './RootStackBindingProps';
import {CreateChatContainer} from '../../containers/CreateChatContainer';

export type CreateChatBinding = RootStackBindingProps<'CreateChat'>;

export default observer(function CreateChatBinding({
  navigation,
}: CreateChatBinding) {
  const goToChat = useCallback(
    (id: string) => navigation.replace('Chat', {chatId: id}),
    [navigation],
  );
  return <CreateChatContainer goToChat={goToChat} />;
});
