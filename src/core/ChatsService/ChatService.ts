import {Service} from '../structure';
import {JsonKeyValueMap, JsonKeyValueStore} from '../JsonKeyValueStore';
import {FULFILLED, PromiseStateProvider} from '../AsyncAtom';
import {Chat, Message, Role} from './types';
import PromiseStateProviderImpl from '../AsyncAtom/PromiseStateProviderImpl';
import {bind} from '../fp';
import {nanoid} from 'nanoid/non-secure';

export default class ChatService implements Service {
  private readonly _messagesProvider: PromiseStateProvider<Message[], Error>;
  private readonly _chatInfoProvider: PromiseStateProvider<Chat, Error>;

  constructor(
    private readonly _root: {
      readonly jsonKeyValueStore: JsonKeyValueStore<JsonKeyValueMap>;
    },
    readonly chatId: string,
  ) {
    this._messagesProvider = new PromiseStateProviderImpl(this._loadMessages);
    this._chatInfoProvider = new PromiseStateProviderImpl(this._loadChatInfo);
  }

  get messagesState() {
    return this._messagesProvider.state;
  }

  get chatInfoState() {
    return this._chatInfoProvider.state;
  }

  addMessage = bind(async (content: string, role: Role) => {
    if (!this.messagesState || this.messagesState.status !== FULFILLED) {
      throw new Error();
    }
    const chats = (await this._getChatsRecord()) ?? {};
    const messages = chats[this.chatId] ?? [];
    const message = {
      id: nanoid(10),
      role: role,
      content,
    };
    messages.unshift(message);
    chats[this.chatId] = messages;
    await this._root.jsonKeyValueStore.set('chatsRecord', chats);
    await this._messagesProvider.fetch(true);
  }, this);

  private _getChatsRecord() {
    return this._root.jsonKeyValueStore.get('chatsRecord');
  }

  private _getChats() {
    return this._root.jsonKeyValueStore.get('chats');
  }

  private _loadMessages = bind(async () => {
    const chats = await this._getChatsRecord();
    return chats?.[this.chatId] || [];
  }, this);

  private _loadChatInfo = bind(async () => {
    const chats = await this._getChats();
    const chat = chats?.find(_ => _.id === this.chatId);
    if (!chat) {
      throw new Error();
    }
    return chat;
  }, this);

  subscribe() {
    // noinspection JSIgnoredPromiseFromCall
    this._messagesProvider.fetch();
    // noinspection JSIgnoredPromiseFromCall
    this._chatInfoProvider.fetch();
    return undefined;
  }
}
