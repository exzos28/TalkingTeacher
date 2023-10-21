import {BusSource} from '../structure';
import {Url} from '../units';

export interface LocationSource {
  getInitial(): Promise<Url | undefined>;
  readonly updates: BusSource<(current: Url) => void>;
}
