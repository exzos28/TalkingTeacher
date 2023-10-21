import React from 'react';
import {Button} from 'react-native';

import {observer} from 'mobx-react-lite';

import {useRoot} from '../../core/Root/hooks';
import {Bubble, Direction, Gutter, Space} from '../../components/basic';
import {Text} from '@ui-kitten/components';

export default observer(function SentrySection() {
  const {manualTestHelper} = useRoot();
  return (
    <Bubble>
      <Text category="h4">Sentry</Text>
      <Space gutter={Gutter.Small} direction={Direction.Row} wrap>
        <Button onPress={manualTestHelper.nativeCrush} title="Native crush" />
        <Button onPress={manualTestHelper.simpleCrush} title="Simple crush" />
      </Space>
    </Bubble>
  );
});
