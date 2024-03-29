import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {Button, Divider, Layout} from '@ui-kitten/components';
import {variance} from '../../core';
import {EmptyContent} from './EmptyContent';
import {FlatList} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import {ChatItem} from './ChatItem';
import {PADDING} from '../constants';
import {Chat} from '../../core/ChatService';
import {useStrings} from '../../core/Root/hooks';

export type ChatsScreenProps = {
  onCreatePress(): void;
  onChatPress(chatId: string): void;
  getChats(): Chat[];
};

export const ChatsScreen = observer(
  ({onCreatePress, onChatPress, getChats}: ChatsScreenProps) => {
    const chats = getChats();
    const renderItem = useCallback(
      ({item}: {item: Chat}) => (
        <ChatItem onPress={() => onChatPress(item.id)} item={item} />
      ),
      [onChatPress],
    );
    return (
      <RootLayout level="4">
        <FlatList
          contentContainerStyle={styles.container}
          data={chats}
          renderItem={renderItem}
          ListEmptyComponent={EmptyContent}
          ItemSeparatorComponent={Divider}
          ListFooterComponentStyle={styles.footer}
        />
        <Footer onCreatePress={onCreatePress} />
      </RootLayout>
    );
  },
);

const FOOTER_HEIGHT = 90;

export type FooterProps = {
  onCreatePress(): void;
};

const Footer = observer(({onCreatePress}: FooterProps) => {
  const strings = useStrings();
  return (
    <FooterView>
      <Button size="giant" onPress={onCreatePress}>
        {strings['chats.createChat']}
      </Button>
    </FooterView>
  );
});

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: FOOTER_HEIGHT,
  },
  footer: {
    marginTop: 'auto',
  },
});

const RootLayout = variance(Layout)(() => ({
  root: {
    flex: 1,
  },
}));

const FooterView = variance(View)(() => ({
  root: {
    height: FOOTER_HEIGHT,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    padding: PADDING,
  },
}));
