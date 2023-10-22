import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {CreateChatScreen, CreateChatValues} from '../screens/CreateChatScreen';
import {useRoot} from '../core/Root/hooks';

export type CreateChatContainerProps = {
  goBack(): void;
};

export const CreateChatContainer = observer(
  ({goBack}: CreateChatContainerProps) => {
    const {chats, settings} = useRoot();
    const submit = useCallback(
      async (values: CreateChatValues) => {
        const config = {
          ...values,
          language: settings.studiedLanguage,
        };
        await chats.createChat(config);
        goBack();
      },
      [chats, goBack, settings],
    );
    return <CreateChatScreen onSubmit={submit} />;
  },
);
