import {Locale} from './core/Localization';
import {DeFlagSvg, EnFlagSvg, RuFlagSvg} from './assets/svg';

export const TOPICS: Map<Locale, string[]> = new Map([
  [
    Locale.Russian,
    [
      'Путешествия и туризм',
      'Еда и кулинария',
      'Искусство и культура',
      'Спорт и фитнес',
      'Технологии и инновации',
      'Здоровье и медицина',
      'Природа и окружающая среда',
      'История и исторические события',
      'Литература и книги',
      'Образование и саморазвитие',
    ],
  ],
  [
    Locale.English,
    [
      'Travel and Tourism',
      'Food and Cooking',
      'Art and Culture',
      'Sports and Fitness',
      'Technology and Innovation',
      'Health and Medicine',
      'Nature and Environment',
      'History and Historical Events',
      'Literature and Books',
      'Education and Self-Improvement',
    ],
  ],
  [
    Locale.German,
    [
      'Reisen und Tourismus',
      'Essen und Kochen',
      'Kunst und Kultur',
      'Sport und Fitness',
      'Technologie und Innovation',
      'Gesundheit und Medizin',
      'Natur und Umwelt',
      'Geschichte und historische Ereignisse',
      'Literatur und Bücher',
      'Bildung und Selbstverbesserung',
    ],
  ],
]);
export const LANGUAGES = new Map([
  [
    Locale.English,
    {
      Icon: EnFlagSvg,
      text: 'English',
      value: Locale.English,
    },
  ],
  [
    Locale.German,
    {
      Icon: DeFlagSvg,
      text: 'Deutsch',
      value: Locale.German,
    },
  ],
  [
    Locale.Russian,
    {
      Icon: RuFlagSvg,
      text: 'Русский',
      value: Locale.Russian,
    },
  ],
]);
