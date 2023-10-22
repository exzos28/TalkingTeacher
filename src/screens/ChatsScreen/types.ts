import {Locale} from '../../core/Localization';

export type Chat = {
  topic: string;
  difficulty: number;
  grammarCheck: boolean;
  language: Locale;
};
