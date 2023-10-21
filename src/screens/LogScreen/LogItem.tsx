import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import dayjs from 'dayjs';
import {observer} from 'mobx-react-lite';

import useBoolean from '../../core/hooks/useBoolean';
import {LogContent} from '../../core/Log/LogContent';
import {variance} from '../../core/styling';
import {Millisecond} from '../../core/Time';
import Copyable from '../../components/Copyable';

export interface LogItemProps {
  content: LogContent;
  capturedAt: Millisecond;
}

export default observer((props: LogItemProps) => {
  const {content, capturedAt} = props;
  const [visible, show, hide] = useBoolean(false);
  const numberOfLines = visible ? undefined : 10;
  return (
    <View style={styles.root}>
      <Date>{dayjs(capturedAt).format()}</Date>
      <Copyable
        onLongPress={visible ? hide : show}
        numberOfLines={numberOfLines}>
        {content.body}
      </Copyable>
    </View>
  );
});

const Date = variance(Text)(theme => ({
  root: {
    fontSize: 13,
  },
}));

const styles = StyleSheet.create({
  root: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});
