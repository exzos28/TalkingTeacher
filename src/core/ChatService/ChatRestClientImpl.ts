import {ChatRestClient, SentMessage} from './ChatRestClient';
import {drop} from 'lodash';

export default class ChatRestClientImpl implements ChatRestClient {
  private _filterMessages(
    messages: SentMessage[],
    maxTokens: number = 2000,
  ): SentMessage[] {
    let totalTokens = 0;
    const firstMessage = messages[0];
    const filteredMessages: SentMessage[] = [];

    for (const message of drop(messages).reverse()) {
      const messageTokens = message.content.split(' ').length;
      if (totalTokens + messageTokens <= maxTokens) {
        filteredMessages.unshift(message);
        totalTokens += messageTokens;
      }
    }

    filteredMessages.unshift(firstMessage);

    return filteredMessages;
  }

  async send(messages: SentMessage[]): Promise<string> {
    const mewMessages = this._filterMessages(messages);
    try {
      const response = await fetch('http://3.70.155.81:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mewMessages),
      });
      const data = await response.json();
      return data.message.content;
    } catch (error) {
      throw error;
    }
  }
}
