import {
  AbstractJsonKeyValueMap,
  JsonKeyValueStore,
  UpdatesJsonKeyValueMap,
} from './JsonKeyValueStore';
import {Json, JsonSerializable} from '../Json';
import {KeyValueStore} from '../KeyValueStore';
import {RouterImpl, RouterSource, Service} from '../structure';

export default class JsonKeyValueStoreService<
  KV extends AbstractJsonKeyValueMap = AbstractJsonKeyValueMap,
> implements JsonKeyValueStore<KV>, Service
{
  constructor(
    private readonly _root: {readonly json: Json},
    private readonly _store: KeyValueStore<KV>,
  ) {}

  async get<K extends keyof KV>(
    key: K,
  ): Promise<KV[K]['__jsonSerialized__'] | undefined> {
    const value_ = await this._store.get(key);
    if (value_ === undefined) {
      return value_;
    }
    return this._root.json.parse(value_);
  }

  async set<K extends keyof KV>(
    key: K,
    value: KV[K]['__jsonSerialized__'],
  ): Promise<void> {
    const stringify_ = this._root.json.stringify(value);
    return this._store.set(key, stringify_ as KV[K]);
  }

  async delete<K extends keyof KV>(key: K): Promise<void> {
    return this._store.delete(key);
  }

  readonly _sideUpdates = new RouterImpl<
    UpdatesJsonKeyValueMap<AbstractJsonKeyValueMap>
  >();

  get sideUpdates() {
    return this._sideUpdates as RouterSource<UpdatesJsonKeyValueMap<KV>>;
  }

  subscribe() {
    return this._store.sideUpdates.domain.listen(event => {
      if (this._sideUpdates.getListeners(String(event.theme)).size === 0) {
        return;
      }
      const [next, previous] = event.args;
      let jsonNext: JsonSerializable | undefined;
      if (next !== undefined) {
        try {
          jsonNext = this._root.json.parse(next);
        } catch (ignore) {}
      }
      let jsonPrevious: JsonSerializable | undefined;
      if (previous !== undefined) {
        try {
          jsonPrevious = this._root.json.parse(previous);
        } catch (ignore) {}
      }
      this._sideUpdates.send(String(event.theme), jsonNext, jsonPrevious);
    });
  }
}
