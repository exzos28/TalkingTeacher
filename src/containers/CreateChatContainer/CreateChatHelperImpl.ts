import {CreateChatValues} from '../../screens/CreateChatScreen';
import {Settings} from '../../core/Settings';
import {ChatRestClient, Chats} from '../../core/ChatService';
import {FULFILLED} from '../../core/AsyncAtom';
import {JsonKeyValueMap, JsonKeyValueStore} from '../../core';
import {nanoid} from 'nanoid/non-secure';
import {getInitialMessage} from './getInitialMessage';

export class CreateChatHelperImpl {
  constructor(
    private readonly _root: {
      readonly settings: Settings;
      readonly chats: Chats;
      readonly jsonKeyValueStore: JsonKeyValueStore<JsonKeyValueMap>;
      readonly chatRestClient: ChatRestClient;
    },
  ) {}

  async create(values: CreateChatValues) {
    const studiedLanguage = this._root.settings.studiedLanguage;
    const config = {
      ...values,
      language: studiedLanguage,
    };
    const id = await this._root.chats.createChat(config);
    if (this._root.chats.state?.status !== FULFILLED) {
      throw new Error('Chats state is not FULFILLED');
    }
    const chats = (await this._root.jsonKeyValueStore.get('chatsRecord')) ?? {};
    const initialMessage = {
      content: getInitialMessage(values, studiedLanguage),
      role: 'user',
    } as const;
    const response = await this._root.chatRestClient.send([initialMessage]);
    chats[id] = [
      {role: 'assistant', content: response, id: nanoid(10)},
      {...initialMessage, id: nanoid(10)},
    ];
    await this._root.jsonKeyValueStore.set('chatsRecord', chats);
    return id;
  }
}
