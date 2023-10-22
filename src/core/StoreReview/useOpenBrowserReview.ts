import {useCallback} from 'react';
import {Platform} from 'react-native';

import {detect} from 'detect-browser';

import {useRoot} from '../Root/hooks';

export default () => {
  const {location, configuration} = useRoot();
  const getStoreLink = useCallback(() => {
    const {appStoreUrl, playStoreUrl} = configuration.values;
    switch (Platform.OS) {
      case 'ios':
        return appStoreUrl;
      case 'android':
        return playStoreUrl;
      case 'web':
      default:
        const d = detect();
        if (d?.os === 'Mac OS') {
          return appStoreUrl;
        }
        return playStoreUrl;
    }
  }, [configuration.values]);

  return useCallback(
    async () => location.open(getStoreLink()),
    [getStoreLink, location],
  );
};
