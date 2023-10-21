import {ManualTestHelper} from './ManualTestHelper';
import {Sentry} from '../Sentry';

export default class ManualTestHelperImpl implements ManualTestHelper {
  nativeCrush() {
    Sentry.nativeCrash();
  }

  simpleCrush() {
    throw new Error('Test Sentry error!');
  }
}
