import {
  cacheDirectory,
  EncodingType,
  writeAsStringAsync,
} from 'expo-file-system';
import {shareAsync} from 'expo-sharing';

import {Sharing} from './Sharing';

export default class MobileSharingImpl implements Sharing {
  async shareFile(fileName: string, content: string): Promise<void> {
    try {
      const uri = cacheDirectory + `/${fileName}`;
      await writeAsStringAsync(uri, content, {encoding: EncodingType.UTF8});
      await shareAsync(uri);
    } catch (err) {
      throw new Error('Sharing error');
    }
  }
}
