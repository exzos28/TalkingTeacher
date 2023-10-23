import {
  SynthesizeParams,
  TextToSpeechRestClient,
} from './TextToSpeechRestClient';
import RNFetchBlob from 'rn-fetch-blob';
import * as Crypto from 'expo-crypto';
import * as FileSystem from 'expo-file-system';
import {Uri} from '../units';

export default class TextToSpeechRestClientImpl
  implements TextToSpeechRestClient
{
  protected readonly BASE_URL = 'http://3.70.155.81:3000/api/audio/paid';
  private readonly _CACHE_DIRECTORY = RNFetchBlob.fs.dirs.CacheDir;

  private async _getTargetPath(text: string) {
    const digest =
      (await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA1,
        text,
      )) + '.mp3';
    return `${this._CACHE_DIRECTORY}/${digest}` as Uri;
  }

  private async _fetch(targetPath: Uri, params: SynthesizeParams) {
    try {
      const response = await RNFetchBlob.config({
        path: targetPath,
      }).fetch(
        'POST',
        `${this.BASE_URL}`,
        {
          'Content-Type': 'application/json',
        },
        JSON.stringify(params),
      );
      return response.path() as Uri;
    } catch (error) {
      throw new Error(`Error ${error}`);
    }
  }

  private async _getUriIfFileExists(uri: Uri) {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!fileInfo) {
        return null;
      }
      return fileInfo.uri as Uri;
    } catch (ignore) {
      return null;
    }
  }

  async synthesize(params: SynthesizeParams) {
    const targetPath = await this._getTargetPath(params.text);
    const cachedUri = await this._getUriIfFileExists(targetPath);
    return cachedUri ?? (await this._fetch(targetPath, params));
  }
}
