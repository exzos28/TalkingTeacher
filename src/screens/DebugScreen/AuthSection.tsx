import React from 'react';

import {observer} from 'mobx-react-lite';

import {Text} from '@ui-kitten/components';
import {Bubble, Space} from '../../components/basic';

export default observer(function AuthSection({}) {
  return (
    <Bubble>
      <Space>
        <Text category="h4">Auth</Text>
      </Space>
    </Bubble>
  );
});
