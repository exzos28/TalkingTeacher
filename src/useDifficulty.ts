import {useStrings} from './core/Root/hooks';

export enum Difficulty {
  Light,
  Medium,
  Heavy,
}

export const useDifficulty = () => {
  const strings = useStrings();
  return [
    strings['difficulty.light'],
    strings['difficulty.medium'],
    strings['difficulty.heavy'],
  ];
};
