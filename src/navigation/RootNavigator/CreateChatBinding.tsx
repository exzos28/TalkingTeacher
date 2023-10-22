import React from 'react';
import {observer} from 'mobx-react-lite';
import {RootStackBindingProps} from './RootStackBindingProps';
import {CreateChatContainer} from '../../containers/CreateChatContainer';

export type CreateChatBinding = RootStackBindingProps<'CreateChat'>;

export default observer(function CreateChatBinding({
  navigation,
}: CreateChatBinding) {
  return <CreateChatContainer goBack={navigation.goBack} />;
});
