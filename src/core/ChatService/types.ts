import {Language} from '../Language';
import {Difficulty} from '../../useDifficulty';

export type Chat = ChatConfig & {
  id: string;
};

export type ChatConfig = {
  topic: string;
  language: Language;
  difficulty: Difficulty;
  grammarCheck: boolean;
};

export type Message = {
  id: string;
  role: Role;
  content: string;
};

export type Role = 'assistant' | 'user';
