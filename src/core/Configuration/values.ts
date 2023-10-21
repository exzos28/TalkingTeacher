import {ConfigurationValues} from './ConfigurationValues';
import {Url} from '../units';
import {Millisecond} from '../Time';

const values: ConfigurationValues = {
  eulaLink: 'https://likesfaster.com/eula.html/' as Url,
  privacyLink: 'https://likesfaster.com/privacy.html/' as Url,
  termsLink: 'https://likesfaster.com/terms.html/' as Url,

  restApiUrl: 'https://api.likesfaster.com/api/' as Url,
  restApiTimeout: 10000 as Millisecond,
  googleApisUrl: 'https://maps.googleapis.com/maps/api/' as Url,
  googleApiKey: 'AIzaSyBs7xX-cPjnIN1GPtUfTMK6QrmSBAl50h0',

  googleIosClientId:
    '622108729494-dapanua0dorpk8toolatl6k80veauvkm.apps.googleusercontent.com',
  googleAndroidClientId:
    '622108729494-99tagn668hmiiu15nlkdm5sjc1b22gd7.apps.googleusercontent.com',

  androidRewardedAdUnitId: 'ca-app-pub-6517374319512243/6056172693',
  iosRewardedAdUnitId: 'ca-app-pub-6517374319512243/8769461363',

  androidInterstitialAdUnitId: 'ca-app-pub-6517374319512243/5591175780',
  iosInterstitialAdUnitId: 'ca-app-pub-6517374319512243/2965012442',

  quizLinkEn: 'https://bit.ly/3DaF69L' as Url,
  quizLinkGe: 'https://bit.ly/36zMPlA' as Url,
  quizLinkRu: 'https://bit.ly/3IH0uV1' as Url,
};

export default values;
