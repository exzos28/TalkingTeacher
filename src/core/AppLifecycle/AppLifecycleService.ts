import {flow, makeObservable, observable} from 'mobx';
import {AsyncReturnType} from 'type-fest';

import {AppLifecycle} from './AppLifecycle';
import {APP_LIFECYCLE, define} from '../persistence';
import {Service} from '../structure';

export default class AppLifecycleService implements AppLifecycle, Service {
  @observable private _initialized = false;
  @observable private _record?: AppLifeCycleRecord;

  get initialized() {
    return this._initialized;
  }

  get hasJustBeenInstalled() {
    return this._record?.hasJustBeenInstalled ?? false;
  }

  constructor() {
    makeObservable(this);
  }

  private _load = flow(function* (this: AppLifecycleService) {
    const record_: AsyncReturnType<typeof getAppLifecycle> =
      yield getAppLifecycle();
    if (record_ === null) {
      this._record = {hasJustBeenInstalled: true};
    } else {
      this._record = record_;
    }
    this._initialized = true;
    if (this._record) {
      yield setAppLifecycle({...this._record, hasJustBeenInstalled: false});
    }
  });

  async purge() {
    await setAppLifecycle();
  }

  subscribe() {
    this._load();
  }
}

interface AppLifeCycleRecord {
  hasJustBeenInstalled: boolean;
}

const [getAppLifecycle, setAppLifecycle] =
  define<AppLifeCycleRecord>(APP_LIFECYCLE);
