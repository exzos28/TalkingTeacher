import {PromiseState} from '../AsyncAtom';
import {Chat, ChatConfig} from './types';
import {Bound} from '../fp';

export interface Chats {
  readonly state: PromiseState<Chat[], Error> | undefined;
  createChat: Bound<(config: ChatConfig) => Promise<string>, Chats>;
}
