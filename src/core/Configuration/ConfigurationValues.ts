import {Email, Url} from '../units';

export type ConfigurationValues = {
  eulaLink: Url;
  privacyLink: Url;
  termsLink: Url;

  playStoreUrl: Url;
  appStoreUrl: Url;

  feedbackMail: Email;

  interstitialAd: string;
};
