import {
  deleteItemAsync,
  getItemAsync,
  isAvailableAsync,
  SecureStoreOptions,
  setItemAsync,
} from 'expo-secure-store';

import {
  AbstractKeyValueMap,
  KeyValueStore,
  KeyValueStoreError,
  UpdatesKeyValueMap,
} from './KeyValueStore';
import {RouterImpl, RouterSource} from '../structure';

export default abstract class BaseSecureKeyValueStoreImpl<
  KV extends AbstractKeyValueMap,
> implements KeyValueStore<KV>
{
  static isAvailable() {
    return isAvailableAsync();
  }

  protected abstract _getOptions<K extends keyof KV>(
    key: K,
  ): SecureStoreOptions | undefined;

  async get<K extends keyof KV>(key: K): Promise<KV[K] | undefined> {
    try {
      const value = await getItemAsync(String(key), this._getOptions(key));
      return (value ?? undefined) as KV[K] | undefined;
    } catch (raw) {
      throw new KeyValueStoreError('get', raw);
    }
  }

  async set<K extends keyof KV>(key: K, value: KV[K]): Promise<void> {
    try {
      await setItemAsync(String(key), value, this._getOptions(key));
    } catch (raw) {
      throw new KeyValueStoreError('set', raw);
    }
  }

  async delete<K extends keyof KV>(key: K): Promise<void> {
    try {
      await deleteItemAsync(String(key), this._getOptions(key));
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
