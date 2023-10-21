import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  AbstractKeyValueMap,
  KeyValueStore,
  KeyValueStoreError,
  UpdatesKeyValueMap,
} from './KeyValueStore';
import {RouterImpl, RouterSource} from '../structure';

export default class KeyValueStoreImpl<
  KV extends AbstractKeyValueMap = AbstractKeyValueMap,
> implements KeyValueStore<KV>
{
  async get<K extends keyof KV>(key: K): Promise<KV[K] | undefined> {
    try {
      const value = await AsyncStorage.getItem(String(key));
      return (value ?? undefined) as KV[K] | undefined;
    } catch (raw) {
      throw new KeyValueStoreError('get', raw);
    }
  }

  async set<K extends keyof KV>(key: K, value: KV[K]): Promise<void> {
    try {
      await AsyncStorage.setItem(String(key), value);
    } catch (raw) {
      throw new KeyValueStoreError('set', raw);
    }
  }

  async delete<K extends keyof KV>(key: K): Promise<void> {
    try {
      await AsyncStorage.removeItem(String(key));
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
}
