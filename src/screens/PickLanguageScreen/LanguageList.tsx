import React, {useCallback} from 'react';
import {FlatListProps, StyleSheet} from 'react-native';
import LanguageItem, {ListItem} from './LanguageItem';
import {observer} from 'mobx-react-lite';
import {ReadonlyDeep} from 'type-fest';
import {Divider} from '@ui-kitten/components';
import {FlatList} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LANGUAGES} from '../../DATA';
import {Language} from '../../core/Language';

export type LanguageListProps = {
  onSelect(language: Language): void;
  selected?: Language;
};

export default observer(function LanguageList(props: LanguageListProps) {
  const {onSelect, selected} = props;
  const values = [...LANGUAGES.values()];
  const renderItem = useCallback(
    ({item}: {item: ListItem}) => {
      const active = selected === item.value;
      return (
        <LanguageItem
          item={item}
          onPress={() => onSelect(item.value)}
          selected={active}
        />
      );
    },
    [onSelect, selected],
  );

  const insets = useSafeAreaInsets();

  return (
    <FlatList
      contentContainerStyle={[styles.container, {paddingBottom: insets.bottom}]}
      data={values}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={Divider}
    />
  );
});

const styles = StyleSheet.create({
  container: {},
});

export type ListProps = FlatListProps<ReadonlyDeep<ListItem>>;

const keyExtractor: ListProps['keyExtractor'] = entry => entry.value;
