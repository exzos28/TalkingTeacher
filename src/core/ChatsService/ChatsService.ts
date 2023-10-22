import {Service} from '../structure';
import {JsonKeyValueMap, JsonKeyValueStore} from '../JsonKeyValueStore';
import {PromiseStateProvider, PromiseStateProviderImpl} from '../AsyncAtom';
import {Chat, ChatConfig} from './types';
import {bind} from '../fp';
import {FULFILLED} from '../AsyncAtom';
import {nanoid} from 'nanoid/non-secure';
import {Chats} from './Chats';

export default class ChatsService implements Service, Chats {
  private readonly _chatsProvider: PromiseStateProvider<Chat[], Error>;

  constructor(
    private readonly _root: {
      readonly jsonKeyValueStore: JsonKeyValueStore<JsonKeyValueMap>;
    },
  ) {
    this._chatsProvider = new PromiseStateProviderImpl(this._load);
  }

  get state() {
    return this._chatsProvider.state;
  }

  createChat = bind(async (config: ChatConfig) => {
    if (!this.state || this.state.status !== FULFILLED) {
      throw Error();
    }
    const chats = this.state.result;
    const newChat = {...config, id: nanoid(10)};
    chats.push(newChat);
    await this._root.jsonKeyValueStore.set('chats', chats);
    await this._chatsProvider.fetch();
  }, this);

  private _getChats() {
    return this._root.jsonKeyValueStore.get('chats');
  }

  private _load = bind(async () => {
    const chats = await this._getChats();
    return chats ?? [];
  }, this);

  subscribe() {
    // noinspection JSIgnoredPromiseFromCall
    this._chatsProvider.fetch();
    return undefined;
  }
}
