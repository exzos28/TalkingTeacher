import React from 'react';
import {Button} from 'react-native';

import {observer} from 'mobx-react-lite';
import useLogExporter from '../../core/LogExporter/useLogExporter';
import {useRoot} from '../../core/Root/hooks';
import {Bubble, Direction, Gutter, Space} from '../../components/basic';
import {Text} from '@ui-kitten/components';

export type LogsSectionProps = {
  onOpenLogsPress: () => void;
};

export default observer(function LogsSection({
  onOpenLogsPress,
}: LogsSectionProps) {
  const {saveLog, shareLog, copyLog} = useLogExporter();
  const {debug} = useRoot();
  return (
    <Bubble>
      <Text category="h4">Logs</Text>
      <Space gutter={Gutter.Small} direction={Direction.Row} wrap>
        <Button
          title={debug.logEnabled ? 'Disable log' : 'Enable log'}
          onPress={debug.toggleLog}
        />
        <Button title="OPEN LOG" onPress={onOpenLogsPress} />
        <Button title="COPY LOG" onPress={copyLog} />
        <Button title="SHARE LOG" onPress={shareLog} />
        <Button title="SAVE LOG" onPress={saveLog} />
      </Space>
    </Bubble>
  );
});
