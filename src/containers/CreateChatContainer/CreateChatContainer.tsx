import React, {useCallback, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {
  CreateChatScreen,
  CreateChatValues,
} from '../../screens/CreateChatScreen';
import {useRoot} from '../../core/Root/hooks';
import {CreateChatHelperImpl} from './CreateChatHelperImpl';

export type CreateChatContainerProps = {
  goToChat(id: string): void;
};

export const CreateChatContainer = observer(
  ({goToChat}: CreateChatContainerProps) => {
    const root = useRoot();
    const {settings} = root;
    const [isLoading, setIsLoading] = useState(false);
    const [helper] = useState(() => new CreateChatHelperImpl(root));
    const submit = useCallback(
      async (values: CreateChatValues) => {
        setIsLoading(true);
        const id = await helper.create(values);
        setIsLoading(false);
        goToChat(id);
      },
      [goToChat, helper],
    );
    return (
      <CreateChatScreen
        isLoading={isLoading}
        onSubmit={submit}
        studiedLanguage={settings.studiedLanguage}
      />
    );
  },
);
