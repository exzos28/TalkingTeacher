import {Service} from '../structure';
import {makeObservable, observable, runInAction} from 'mobx';
import {FlagList, Flags} from './Flags';
import {JsonKeyValueMap, JsonKeyValueStore} from '../JsonKeyValueStore';
import {FULFILLED} from '../AsyncAtom';

export default class FlagsService implements Flags, Service {
  @observable.ref private _state: Flags['state'];

  constructor(
    private readonly _root: {
      readonly jsonKeyValueStore: JsonKeyValueStore<JsonKeyValueMap>;
    },
  ) {
    makeObservable(this);
  }

  get state() {
    return this._state;
  }

  private async _getFlags() {
    const state_ = await this._root.jsonKeyValueStore.get('flag');
    return new Map(Object.entries(state_ ?? {})) as Map<
      FlagList,
      boolean | undefined
    >;
  }

  async setFlag(flag: FlagList, value: boolean) {
    const flags = await this._getFlags();
    if (flags) {
      const newFlags = flags;
      newFlags.set(flag, value);
      await this._root.jsonKeyValueStore.set(
        'flag',
        Object.fromEntries(newFlags) as Record<FlagList, boolean>,
      );
      runInAction(() => {
        this._state = {
          result: newFlags,
          status: FULFILLED,
        };
      });
    }
  }

  private async _load() {
    const flags = await this._getFlags();
    runInAction(() => {
      this._state = {
        status: FULFILLED,
        result: flags,
      };
    });
  }

  subscribe() {
    // noinspection JSIgnoredPromiseFromCall
    this._load();
    return undefined;
  }
}
