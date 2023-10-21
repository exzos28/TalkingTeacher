import HeadlessLocationImpl from './HeadlessLocationImpl';
import {Location} from './Location';
import {Navigation} from '../Navigation';
import {EXTERNAL, SpecialLocation} from '../SpecialLocation';
import {Url} from '../units';

export default abstract class BaseWebLocationImpl
  extends HeadlessLocationImpl
  implements Location
{
  protected constructor(
    protected readonly _root: {
      readonly specialLocation: SpecialLocation;
      readonly navigation: Navigation;
    },
  ) {
    super();
  }

  get base() {
    return window.location.origin as Url;
  }

  abstract get prefixes(): string[];

  private _removePrefix(locator: Url): Url {
    for (const prefix of this.prefixes) {
      if (locator.startsWith(prefix)) {
        return locator.replace(prefix, '') as Url;
      }
    }
    return locator;
  }

  async open(_locator: Url): Promise<void> {
    if (this._root.specialLocation.parse(_locator).kind === EXTERNAL) {
      return super.open(_locator);
    }
    try {
      const path = this._removePrefix(_locator);
      this._root.navigation.navigate(path);
    } catch (error) {
      throw new Error('Opening url failed');
    }
  }
}
