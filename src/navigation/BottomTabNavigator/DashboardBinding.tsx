import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {RootBottomTabBindingProps} from './RootBottomTabBindingProps';
import {ChatsContainer} from '../../containers/ChatsContainer';

export type DashboardBindingProps = RootBottomTabBindingProps<'Dashboard'>;

export default observer(function DashboardBinding({
  navigation,
}: DashboardBindingProps) {
  const goToCreateChat = useCallback(
    () => navigation.navigate('CreateChat'),
    [navigation],
  );
  const goToChat = useCallback(() => navigation.navigate('Chat'), [navigation]);
  return <ChatsContainer goToChat={goToChat} goToCreateChat={goToCreateChat} />;
});
