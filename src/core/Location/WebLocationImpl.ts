import {PREFIXES} from '../LinkingOptionsProvider/constant';
import {SpecialLocation} from '../SpecialLocation';
import BaseWebLocationImpl from './BaseWebLocationImpl';
import {Navigation} from '../Navigation';
import {Location} from './Location';

export default class WebLocationImpl
  extends BaseWebLocationImpl
  implements Location
{
  constructor(
    protected readonly _root: {
      readonly specialLocation: SpecialLocation;
      readonly navigation: Navigation;
    },
  ) {
    super(_root);
  }

  get prefixes(): string[] {
    return PREFIXES;
  }
}
