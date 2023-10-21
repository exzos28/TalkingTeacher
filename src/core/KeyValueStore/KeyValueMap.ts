import {FlagList} from '../Flags';
import {JsonString} from '../Json';

export type KeyValueMap = {
  [K in string]: string;
} & {
  flag: JsonString<FlagRecord>;
};

export type FlagRecord = Record<FlagList, boolean | undefined>;
