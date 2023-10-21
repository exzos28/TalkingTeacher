import {Platform} from 'react-native';

import MobileRootService from './MobileRootService';
import {Root} from './Root';
import WebRootService from './WebRootService';
import {Core} from '../Core';
import {Service} from '../structure';

export default class RootServiceFactory {
  create(core: Core): Root & Service {
    if (Platform.OS === 'web') {
      return new WebRootService(core);
    } else {
      return new MobileRootService(core);
    }
  }
}
