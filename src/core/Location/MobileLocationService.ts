import HeadlessLocationImpl from './HeadlessLocationImpl';
import {LocationSource} from './LocationSource';
import {batchDisposers, BusSource, Service} from '../structure';
import {EXTERNAL, SpecialLocation} from '../SpecialLocation';
import DeepLinkingLocationSourceService from './DeepLinkingLocationSourceService';
import BatchLocationSourceService from './BatchLocationSourceService';
import {Url} from '../units';
import {MOBILE_PREFIX} from '../LinkingOptionsProvider/constant';
import {Location} from './Location';

export default class MobileLocationService
  extends HeadlessLocationImpl
  implements Location, LocationSource, Service
{
  private readonly _deepLinking;
  private readonly _source;

  constructor(
    protected readonly _root: {
      readonly specialLocation: SpecialLocation;
    },
  ) {
    super();
    this._deepLinking = new DeepLinkingLocationSourceService();
    this._source = new BatchLocationSourceService([this._deepLinking]);
  }

  get base() {
    return MOBILE_PREFIX;
  }

  async open(locator: Url): Promise<void> {
    if (this._root.specialLocation.parse(locator).kind === EXTERNAL) {
      return super.open(locator);
    } else {
      return this._source.open(locator);
    }
  }

  getInitial() {
    return this._source.getInitial();
  }

  get updates(): BusSource<(current: Url) => void> {
    return this._source.updates;
  }

  subscribe() {
    return batchDisposers(
      this._deepLinking.subscribe(),
      this._source.subscribe(),
    );
  }
}
