import {PromiseState} from '../AsyncAtom';

export interface Flags {
  readonly state: PromiseState<State, Error> | undefined;
  setFlag(flag: FlagList, value: boolean): Promise<void>;
}

export type FlagList = 'WELCOMES_DONE';

export type State = Map<FlagList, boolean | undefined>;
