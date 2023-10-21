import React from 'react';
import {
  Button,
  FlatList,
  FlatListProps,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {observer} from 'mobx-react-lite';

import {LogRecord} from '../../core/Log';
import {
  createNullableContext,
  useForcedContext,
} from '../../core/ReactUtil/context';
import {useRoot} from '../../core/Root/hooks';
import {variance} from '../../core/styling';
import LogItem from './LogItem';

export interface LogScreenProps {
  clearLogs: () => void;
  copyLogs: () => void;
  saveLogs: () => void;
  shareLogs: () => void;
}

export default observer((props: LogScreenProps) => {
  const {log} = useRoot();
  return (
    <LogScreenContext.Provider value={props}>
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        data={log.records}
        extraData={log.records.length}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
      />
    </LogScreenContext.Provider>
  );
});

const LogScreenContext = createNullableContext<LogScreenProps>();

type ListProps = FlatListProps<LogRecord>;

const keyExtractor: NonNullable<ListProps['keyExtractor']> = item =>
  String(item.id);

const renderItem: ListProps['renderItem'] = ({item}) => (
  <LogItem content={item.content} capturedAt={item.capturedAt} />
);

const layout = StyleSheet.create({
  filter: {flexDirection: 'row'},
  criteria: {margin: 8},
});

const ListHeaderComponent = observer(() => {
  const {clearLogs, copyLogs, saveLogs, shareLogs} =
    useForcedContext(LogScreenContext);
  return (
    <ScrollView
      horizontal
      style={layout.filter}
      showsHorizontalScrollIndicator={false}>
      <View style={layout.criteria}>
        <Button onPress={clearLogs} color="red" title="Clear" />
      </View>
      <View style={layout.criteria}>
        <Button onPress={copyLogs} title="Copy" />
      </View>
      <View style={layout.criteria}>
        <Button onPress={shareLogs} title="Share" />
      </View>
      <View style={layout.criteria}>
        <Button onPress={saveLogs} title="Save" />
      </View>
    </ScrollView>
  );
});

const Divider = variance(View)(() => ({
  root: {
    height: 1,
    backgroundColor: 'gray',
  },
}));
