import {
  NativeEventSubscription,
  Platform,
  AppState as RNAppState,
} from 'react-native';

import {
  APP_WINDOW_BLUR,
  APP_WINDOW_FOCUS,
  AppWindow,
  AppWindowStateRouterMap,
} from './AppWindow';
import AppWindowStatic from './AppWindowStatic';
import {Disposer, RouterImpl, Service} from '../structure';

export default class AppWindowService implements AppWindow, Service {
  private readonly _updates = new RouterImpl<AppWindowStateRouterMap>();

  get updates(): AppWindow['updates'] {
    return this._updates;
  }

  getStatus() {
    return AppWindowStatic.translateStatus(RNAppState.currentState);
  }

  subscribe() {
    const subs: NativeEventSubscription[] = [];
    subs.push(
      RNAppState.addEventListener('change', _status => {
        const status = AppWindowStatic.translateStatus(_status);
        this._updates.send(status, status);
      }),
    );
    if (Platform.OS === 'android') {
      subs.push(
        ...[
          RNAppState.addEventListener('focus', () => {
            this._updates.send(APP_WINDOW_FOCUS, true);
          }),
          RNAppState.addEventListener('blur', () => {
            this._updates.send(APP_WINDOW_BLUR, false);
          }),
        ],
      );
    }
    return (() => {
      for (const sub of subs) {
        sub.remove();
      }
    }) as Disposer;
  }
}
