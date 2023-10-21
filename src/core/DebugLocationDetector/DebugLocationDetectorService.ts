import {Debug} from '../Configuration';
import {LocationSource} from '../Location';
import {Service} from '../structure';
import {Url} from '../units';

export default class DebugLocationDetectorService implements Service {
  constructor(
    private readonly _root: {
      readonly debug: Debug;
      readonly locationSource: LocationSource;
    },
  ) {}

  private async _processLocator(_: Url) {
    const hasNonce = DebugLocationDetectorService._hasNonce(_);
    if (hasNonce) {
      await this._root.debug.enableDebug();
    }
  }

  private async _initialize() {
    const initial_ = await this._root.locationSource.getInitial();
    if (initial_) {
      return this._processLocator(initial_);
    }
  }

  subscribe() {
    // noinspection JSIgnoredPromiseFromCall
    this._initialize();
    return this._root.locationSource.updates.listen(_ =>
      this._processLocator(_),
    );
  }

  private static _hasNonce(_: Url) {
    return DebugLocationDetectorService._NONCE.test(_);
  }

  private static readonly _NONCE = /#DYxeLF67FwEPUJRVENEM$/gi;
}
