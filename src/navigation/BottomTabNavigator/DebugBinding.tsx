import React, {useCallback} from 'react';

import {observer} from 'mobx-react-lite';
import {useRoot} from '../../core/Root/hooks';
import {DebugScreen} from '../../screens/DebugScreen';
import {RootBottomTabBindingProps} from './RootBottomTabBindingProps';

export type HomeBindingProps = RootBottomTabBindingProps<'Debug'>;

export default observer(function DebugBinding({navigation}: HomeBindingProps) {
  const {debug} = useRoot();
  const goToLog = useCallback(() => navigation.navigate('Log'), [navigation]);

  const disableDebug = useCallback(() => debug.disableDebug(), [debug]);
  return <DebugScreen onDisableDebugPress={disableDebug} goToLog={goToLog} />;
});
