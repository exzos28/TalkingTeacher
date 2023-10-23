import {
  SynthesizeParams,
  TextToSpeechRestClient,
} from './TextToSpeechRestClient';
import {TextToSpeech} from './TextToSpeech';

export default class TextToSpeechImpl implements TextToSpeech {
  constructor(
    private readonly _root: {
      readonly textToSpeechRestClient: TextToSpeechRestClient;
    },
  ) {}

  async synthesize(params: SynthesizeParams) {
    try {
      return this._root.textToSpeechRestClient.synthesize(params);
    } catch (error) {
      throw new Error(`Не удалось преобразовать текст в речь. ${error}`);
    }
  }
}
