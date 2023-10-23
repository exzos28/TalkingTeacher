import {Uri} from '../units';
import {SynthesizeParams} from './TextToSpeechRestClient';

export interface TextToSpeech {
  synthesize(params: SynthesizeParams): Promise<Uri>;
}
