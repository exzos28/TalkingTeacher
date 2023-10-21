import {Linking} from 'react-native';

import BaseHeadlessLocationImpl from './BaseHeadlessLocationImpl';
import {Location} from './Location';
import {Url} from '../units';

export default abstract class HeadlessLocationImpl
  extends BaseHeadlessLocationImpl
  implements Location
{
  abstract get base(): Url;

  async open(locator: Url): Promise<void> {
    try {
      await Linking.openURL(locator);
    } catch (raw) {
      throw new Error('Opening url failed');
    }
  }
}
