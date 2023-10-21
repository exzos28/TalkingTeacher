import {LocationSource} from './LocationSource';
import {batchDisposers, BusImpl, Service} from '../structure';
import {Url} from '../units';

export default class BatchLocationSourceService
  implements LocationSource, Service
{
  constructor(private readonly _sources: LocationSource[]) {}

  async getInitial(): Promise<Url | undefined> {
    for (const source of this._sources) {
      const result = await source.getInitial();
      if (result) {
        return result;
      }
    }
    return undefined;
  }

  private readonly _updates = new BusImpl<(current: Url) => void>();

  get updates(): LocationSource['updates'] {
    return this._updates;
  }

  async open(locator: Url): Promise<void> {
    this._updates.send(locator);
  }

  subscribe() {
    return batchDisposers.apply(
      this,
      this._sources.map(source =>
        source.updates.listen(_ => this._updates.send(_)),
      ),
    );
  }
}
