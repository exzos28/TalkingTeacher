import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {Button, Divider, Layout} from '@ui-kitten/components';
import {variance} from '../../core';
import {EmptyContent} from './EmptyContent';
import {FlatList} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import {Locale} from '../../core/Localization';
import {ChatItem} from './ChatItem';
import {Chat} from './types';
import {PADDING} from '../constants';

export type ChatsScreenProps = {
  onCreatePress(): void;
  onChatPress(): void;
};

const CHATS: Chat[] = [
  {
    topic: 'Travel and Tourism',
    difficulty: 1,
    grammarCheck: false,
    language: Locale.English,
  },
  {
    topic: 'Technology and Innovation',
    difficulty: 0,
    grammarCheck: true,
    language: Locale.English,
  },
  {
    topic: 'Travel and Tourism',
    difficulty: 1,
    grammarCheck: false,
    language: Locale.English,
  },
];

export const ChatsScreen = observer(
  ({onCreatePress, onChatPress}: ChatsScreenProps) => {
    const renderItem = useCallback(
      ({item}: {item: Chat}) => <ChatItem onPress={onChatPress} item={item} />,
      [onChatPress],
    );
    return (
      <RootLayout level="4">
        <FlatList
          contentContainerStyle={styles.container}
          data={CHATS}
          renderItem={renderItem}
          ListEmptyComponent={<EmptyContent onCreatePress={onCreatePress} />}
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
  return (
    <FooterView>
      <Button size="giant" onPress={onCreatePress}>
        Create chat
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
