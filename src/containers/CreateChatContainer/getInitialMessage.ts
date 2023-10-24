import {CreateChatValues} from '../../screens/CreateChatScreen';
import {Language} from '../../core';

export const getInitialMessage = (
  values: CreateChatValues,
  language: Language,
) => {
  const {difficulty, topic, grammarCheck} = values;
  const level = getLevel(difficulty);

  let message = `Ты являешься ТОЛЬКО учителем ${language} языка.`;
  message += `Тема общения ${topic}. Ты должен поддерживать беседу. Твоё сообщение не должно превышать 30 слов. `;
  message += `Всё дальнейшее общение исключительно на ${language} и на ${level} уровне}`;
  message += grammarCheck
    ? 'Ты должен проверять грамматические ошибки в сообщениях (кроме этого) и в конце своего сообщения писать их'
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
