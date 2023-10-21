import {MOBILE_PREFIX} from '../LinkingOptionsProvider/constant';
import HeadlessLocationImpl from './HeadlessLocationImpl';
import {Location} from './Location';

export default class MobileHeadlessLocationImpl
  extends HeadlessLocationImpl
  implements Location
{
  get base() {
    return MOBILE_PREFIX;
  }
}
