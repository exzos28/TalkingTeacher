import {
  AbstractKeyValueMap,
  KeyValueStore,
  KeyValueStoreError,
  UpdatesKeyValueMap,
} from './KeyValueStore';
import {Disposer, RouterImpl, RouterSource, Service} from '../structure';

export default class WebKeyValueStoreService<
  KV extends AbstractKeyValueMap = AbstractKeyValueMap,
> implements KeyValueStore<KV>, Service
{
  async get<K extends keyof KV>(key: K): Promise<KV[K] | undefined> {
    try {
      const value = localStorage.getItem(String(key));
      return (value ?? undefined) as KV[K] | undefined;
    } catch (raw) {
      throw new KeyValueStoreError('get', raw);
    }
  }

  async set<K extends keyof KV>(key: K, value: KV[K]): Promise<void> {
    try {
      localStorage.setItem(String(key), value);
    } catch (raw) {
      throw new KeyValueStoreError('set', raw);
    }
  }

  async delete<K extends keyof KV>(key: K): Promise<void> {
    try {
      localStorage.removeItem(String(key));
    } catch (raw) {
      throw new KeyValueStoreError('delete', raw);
    }
  }

  readonly _sideUpdates = new RouterImpl<
    UpdatesKeyValueMap<AbstractKeyValueMap>
  >();

  get sideUpdates() {
    return this._sideUpdates as RouterSource<UpdatesKeyValueMap<KV>>;
  }

  subscribe() {
    const listener = (_: StorageEvent) => {
      if (_.storageArea === localStorage && _.key !== null) {
        this._sideUpdates.send(
          _.key,
          _.newValue ?? undefined,
          _.oldValue ?? undefined,
        );
      }
    };
    window.addEventListener('storage', listener);
    return (() => {
      window.removeEventListener('storage', listener);
    }) as Disposer;
  }
}
