import {RouterSource} from '../structure';
import {CommonError} from '../Error';

export interface KeyValueStore<
  KV extends AbstractKeyValueMap = AbstractKeyValueMap,
> {
  get<K extends keyof KV>(key: K): Promise<KV[K] | undefined>;
  set<K extends keyof KV>(key: K, value: KV[K]): Promise<void>;
  delete<K extends keyof KV>(key: K): Promise<void>;
  readonly sideUpdates: RouterSource<UpdatesKeyValueMap<KV>>;
}

export type AbstractKeyValueMap = {[K in string]: string};

export type UpdatesKeyValueMap<KV extends AbstractKeyValueMap> = {
  [K in keyof KV]: (next?: KV[K], previous?: KV[K]) => void;
};

export class KeyValueStoreError extends CommonError {
  constructor(
    public readonly kind: 'get' | 'set' | 'delete',
    public readonly reason: unknown,
  ) {
    super(
      `An error occurred while processing an operation of the kind ${kind}`,
    );
    this.name = 'KeyValueStoreError';
  }
}
