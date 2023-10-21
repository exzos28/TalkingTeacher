import AsyncStorage from '@react-native-async-storage/async-storage';
import {ReadonlyDeep} from 'type-fest';
import {UnknownError} from '../Error';

/**
 * @deprecated
 */
export default <T extends any = unknown>(key: string) =>
  [
    /**
     * @throws {never}
     */
    async (): Promise<T | null> => {
      try {
        const item = await AsyncStorage.getItem(key);
        return item === null ? null : JSON.parse(item);
      } catch (raw) {
        throw new UnknownError(raw);
      }
    },
    /**
     * @throws {never}
     */
    async (item?: ReadonlyDeep<T>): Promise<void> => {
      try {
        if (item === undefined) {
          await AsyncStorage.removeItem(key);
        } else {
          await AsyncStorage.setItem(key, JSON.stringify(item));
        }
      } catch (raw) {
        throw new UnknownError(raw);
      }
    },
  ] as const;
