import {Linking} from 'react-native';

import {Location} from './Location';
import {Url} from '../units';

export default abstract class BaseHeadlessLocationImpl implements Location {
  abstract get base(): Url;

  abstract open(locator: Url): Promise<void>;

  async canOpen(locator: Url): Promise<boolean> {
    try {
      return Linking.canOpenURL(locator);
    } catch (raw) {
      throw new Error('Checking url failed');
    }
  }
}
