import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name} from '../package.json';
import * as Sentry from '@sentry/react-native';
import {config} from './core/Sentry';
import TrackPlayer from 'react-native-track-player';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'new NativeEventEmitter()` was called with a non-null argument without the required `addListener` method',
  'new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method.',
]);

export default () => {
  TrackPlayer.setupPlayer();
  if (!__DEV__) {
    Sentry.init(config);
    AppRegistry.registerComponent(name, () => Sentry.wrap(App));
  } else {
    AppRegistry.registerComponent(name, () => App);
  }
};
