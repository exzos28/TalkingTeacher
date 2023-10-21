import {SecureStoreOptions} from 'expo-secure-store';

import BaseSecureKeyValueStoreImpl from './BaseSecureKeyValueStoreImpl';
import {AbstractKeyValueMap, KeyValueStore} from './KeyValueStore';

export default class AndroidSecureKeyValueStoreImpl<
    KV extends AbstractKeyValueMap,
  >
  extends BaseSecureKeyValueStoreImpl<KV>
  implements KeyValueStore<KV>
{
  protected _getOptions(): SecureStoreOptions | undefined {
    return undefined;
  }
}
