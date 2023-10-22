import {useCallback} from 'react';

import * as StoreReview from 'expo-store-review';
import {when} from 'mobx';

import useOpenBrowserReview from './useOpenBrowserReview';
import {useRoot} from '../Root/hooks';

export default function useOpenReview() {
  const {appWindowState} = useRoot();
  const openBrowser = useOpenBrowserReview();
  return useCallback(async () => {
    try {
      if (await StoreReview.isAvailableAsync()) {
        await StoreReview.requestReview();
        await when(() => appWindowState.isFocused);
      } else {
        await openBrowser();
      }
    } catch (raw) {
      await openBrowser();
    }
  }, [appWindowState, openBrowser]);
}
