import {FlagList} from '../Flags';
import {JsonString} from '../Json';
import {Chat, Message} from '../ChatService';

export type KeyValueMap = {
  [K in string]: string;
} & {
  flag: JsonString<FlagRecord>;
  chats: JsonString<Chat[]>;
  chatsRecord: JsonString<Record<string, Message[]>>;
  advert: JsonString<{
    sentMessages: number;
  }>;
};

export type FlagRecord = Record<FlagList, boolean | undefined>;
