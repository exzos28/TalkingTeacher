import {ConfigurationValues} from './ConfigurationValues';
import {Email, Url} from '../units';
import {TestIds} from 'react-native-google-mobile-ads';

const values: ConfigurationValues = {
  eulaLink: 'https://likesfaster.com/eula.html/' as Url,
  privacyLink: 'https://likesfaster.com/privacy.html/' as Url,
  termsLink: 'https://likesfaster.com/terms.html/' as Url,

  // TODO: Change
  playStoreUrl: 'https://google.com/' as Url,
  appStoreUrl: 'https://google.com/' as Url,

  feedbackMail: 'oleksandr.kurinnyi.dev@gmail.com' as Email,

  interstitialAd: __DEV__
    ? TestIds.INTERSTITIAL
    : 'ca-app-pub-6517374319512243/4531363294',
};

export default values;
