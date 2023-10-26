import {Service} from '../structure';
import {Admob} from './Admob';
import {InterstitialAd} from 'react-native-google-mobile-ads';
import {Configuration} from '../Configuration';
import {ConfigurationValues} from '../Configuration/ConfigurationValues';
import {AdEventType} from 'react-native-google-mobile-ads/src/AdEventType';

export default class AdmobService implements Admob, Service {
  private _interstitial?: InterstitialAd;

  constructor(
    private readonly _root: {
      readonly configuration: Configuration<ConfigurationValues>;
    },
  ) {}

  async showInterstitial(): Promise<boolean> {
    this._interstitial?.removeAllListeners();
    if (!this._interstitial?.loaded) {
      return false;
    }
    return new Promise(resolve => {
      this._interstitial?.addAdEventListener(AdEventType.CLOSED, () => {
        resolve(true);
      });
      this._interstitial?.show({immersiveModeEnabled: true});
    });
  }

  private _load() {
    const interstitial = InterstitialAd.createForAdRequest(
      this._root.configuration.values.interstitialAd,
      {
        requestNonPersonalizedAdsOnly: true,
      },
    );
    this._interstitial = interstitial;
    interstitial.load();
  }

  subscribe() {
    this._load();
    return undefined;
  }
}
