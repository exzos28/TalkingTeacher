import {Service} from '../structure';
import {JsonKeyValueMap, JsonKeyValueStore} from '../JsonKeyValueStore';
import {PromiseStateProvider} from '../AsyncAtom/PromiseStateProvider';
import {Message, Role} from './types';
import PromiseStateProviderImpl from '../AsyncAtom/PromiseStateProviderImpl';
import {bind} from '../fp';
import {nanoid} from 'nanoid/non-secure';
import {FULFILLED} from '../AsyncAtom';

export default class ChatService implements Service {
  private readonly _chatProvider: PromiseStateProvider<Message[], Error>;

  constructor(
    private readonly _root: {
      readonly jsonKeyValueStore: JsonKeyValueStore<JsonKeyValueMap>;
    },
    readonly chatId: string,
  ) {
    this._chatProvider = new PromiseStateProviderImpl(this._load);
  }

  get state() {
    return this._chatProvider.state;
  }

  addMessage = bind(async (content: string, role: Role) => {
    if (!this.state || this.state.status !== FULFILLED) {
      throw new Error();
    }
    const chats = (await this._getChats()) ?? {};
    const currentChat = chats[this.chatId] ?? [];
    const message = {
      id: nanoid(10),
      role: role,
      content,
    };
    currentChat.push(message);
    await this._root.jsonKeyValueStore.set('chatsRecord', chats);
    await this._chatProvider.fetch();
  }, this);

  private _getChats() {
    return this._root.jsonKeyValueStore.get('chatsRecord');
  }

  private _load = bind(async () => {
    const chats = await this._getChats();
    const messages = chats?.[this.chatId];
    return messages ?? [];
  }, this);

  subscribe() {
    // noinspection JSIgnoredPromiseFromCall
    this._chatProvider.fetch();
    return undefined;
  }
}
