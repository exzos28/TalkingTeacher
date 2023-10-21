import {Url} from '../units';
import {Millisecond} from '../Time';

export type ConfigurationValues = {
  eulaLink: Url;
  privacyLink: Url;
  termsLink: Url;

  restApiUrl: Url;
  restApiTimeout: Millisecond;
  googleApisUrl: Url;
  googleApiKey: string;

  googleIosClientId: string;
  googleAndroidClientId: string;

  androidRewardedAdUnitId: string;
  iosRewardedAdUnitId: string;

  androidInterstitialAdUnitId: string;
  iosInterstitialAdUnitId: string;

  quizLinkEn: Url;
  quizLinkGe: Url;
  quizLinkRu: Url;
};