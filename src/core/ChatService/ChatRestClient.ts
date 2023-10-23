import {Message} from './types';

export interface ChatRestClient {
  send(messages: SentMessage[]): Promise<string>;
}

export type SentMessage = Omit<Message, 'id'>;
