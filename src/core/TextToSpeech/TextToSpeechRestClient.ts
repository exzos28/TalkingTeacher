import {Uri} from '../units';

export interface TextToSpeechRestClient {
  synthesize(params: SynthesizeParams): Promise<Uri>;
}

export type SynthesizeParams = {
  text: string;
  languageCode: string; // ru, en, de
};
