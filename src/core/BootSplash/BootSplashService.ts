import {reaction} from 'mobx';
import RNBootSplash from 'react-native-bootsplash';
import {BootSplash} from './BootSplash';
import {Service} from '../structure';
import {Core} from '../Core';

export default class BootSplashService implements BootSplash, Service {
  constructor(private readonly _core: Core) {}

  private _listenCoreInitialized() {
    return reaction(
      () => this._core.initialized,
      async (initialized, prev, _) => {
        if (initialized) {
          try {
            await RNBootSplash.hide({fade: true});
            _.dispose();
          } catch (ignore) {}
        }
      },
    );
  }

  subscribe() {
    return this._listenCoreInitialized();
  }
}
