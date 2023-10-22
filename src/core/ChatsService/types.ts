export type Chat = ChatConfig & {
  id: string;
};

export type ChatConversation = Chat & {
  messages: Message[];
};

export type ChatConfig = {
  topic: string;
  language: string;
  difficulty: number;
  grammarCheck: boolean;
};

export type Message = {
  id: string;
  role: Role;
  content: string;
};

export type Role = 'assistant' | 'user';
