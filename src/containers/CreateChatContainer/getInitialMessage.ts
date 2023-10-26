import {CreateChatValues} from '../../screens/CreateChatScreen';
import {Language} from '../../core';

export const getInitialMessage = (
  values: CreateChatValues,
  language: Language,
) => {
  const {difficulty, topic, grammarCheck} = values;
  const level = getLevel(difficulty);

  let message = `You are the ONLY teacher of ${language} language.`;
  message += `The topic of the conversation is ${topic}. You must keep the conversation going. Your message should not exceed 30 words. `;
  message += `All further communication is in ${language} and ${level} level only}`;
  message += grammarCheck
    ? 'In future messages you should check for grammatical errors in your messages and write them at the end of your message.'
    : '';

  return message;
};

const getLevel = (level: number) => {
  switch (level) {
    case 0:
      return 'Лёгкий';
    case 2:
      return 'Продвинутый';
    case 1:
      return 'Средний';
    default:
  }
};
