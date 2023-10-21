import React, {useCallback} from 'react';

import {observer} from 'mobx-react-lite';
import {useRoot} from '../../core/Root/hooks';
import useLogExporter from '../../core/LogExporter/useLogExporter';
import {LogScreen} from '../../screens/LogScreen';

export default observer(function LogBinding() {
  const {log} = useRoot();
  const clearLogs = useCallback(() => log.reset(), [log]);
  const {copyLog, saveLog, shareLog} = useLogExporter();
  return (
    <LogScreen
      clearLogs={clearLogs}
      copyLogs={copyLog}
      saveLogs={saveLog}
      shareLogs={shareLog}
    />
  );
});
