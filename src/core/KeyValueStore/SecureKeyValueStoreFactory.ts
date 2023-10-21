import {Platform} from 'react-native';

import AndroidSecureKeyValueStoreImpl from './AndroidSecureKeyValueStoreImpl';
import IosSecureKeyValueStoreImpl from './IosSecureKeyValueStoreImpl';

import {AbstractKeyValueMap, KeyValueStore} from './index';

export default class SecureKeyValueStoreFactory<
  KV extends AbstractKeyValueMap,
> {
  create(): KeyValueStore<KV> {
    if (Platform.OS === 'ios') {
      return new IosSecureKeyValueStoreImpl<KV>();
    } else {
      return new AndroidSecureKeyValueStoreImpl<KV>();
    }
  }
}
