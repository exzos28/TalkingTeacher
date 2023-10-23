import {ChatRestClient, SentMessage} from './ChatRestClient';

export default class ChatRestClientImpl implements ChatRestClient {
  async send(messages: SentMessage[]): Promise<string> {
    try {
      const response = await fetch('http://3.70.155.81:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messages),
      });
      const data = await response.json();
      return data.message.content;
    } catch (error) {
      throw error;
    }
  }
}
