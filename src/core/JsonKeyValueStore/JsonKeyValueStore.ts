import {JsonString} from '../Json';
import {RouterSource} from '../structure';

export interface JsonKeyValueStore<
  KV extends AbstractJsonKeyValueMap = AbstractJsonKeyValueMap,
> {
  get<K extends keyof KV>(
    key: K,
  ): Promise<KV[K]['__jsonSerialized__'] | undefined>;
  set<K extends keyof KV>(
    key: K,
    value: KV[K]['__jsonSerialized__'],
  ): Promise<void>;
  delete<K extends keyof KV>(key: K): Promise<void>;
  readonly sideUpdates: RouterSource<UpdatesJsonKeyValueMap<KV>>;
}

export type AbstractJsonKeyValueMap = {[K in string]: JsonString};

export type UpdatesJsonKeyValueMap<KV extends AbstractJsonKeyValueMap> = {
  [K in keyof KV]: (
    next?: KV[K]['__jsonSerialized__'],
    previous?: KV[K]['__jsonSerialized__'],
  ) => void;
};
