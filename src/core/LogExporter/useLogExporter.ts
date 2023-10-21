import {useCallback} from 'react';
import {Alert} from 'react-native';

import {setStringAsync} from 'expo-clipboard';

import {useRoot} from '../Root/hooks';

export default () => {
  const {logExporter, log} = useRoot();
  const copyLog = useCallback(async () => {
    await setStringAsync(logExporter.getContent(log));
    Alert.alert('Success', 'The value has been copied to clipboard');
  }, [log, logExporter]);
  const saveLog = useCallback(async () => {
    await logExporter.save();
    Alert.alert('Success', 'The value is successfully saved to the file');
  }, [logExporter]);
  const shareLog = useCallback(async () => {
    await logExporter.share();
  }, [logExporter]);
  return {copyLog, saveLog, shareLog};
};
