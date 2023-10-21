import {Alert, Linking, Platform} from 'react-native';

export enum Target {
  Blank = '_blank',
  Self = '_self',
  Parent = '_parent',
  Top = '_top',
}

export type ErrorDict = {
  title: string;
  description: string;
};

export default async (url: string, target: Target, dict: ErrorDict) => {
  // Checking if the link is supported for links with custom URL scheme.
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the native
    if (Platform.OS === 'web') {
      if (target === undefined) {
        window.location.href = url;
      } else {
        window.open(url, target);
      }
    } else {
      await Linking.openURL(url);
    }
  } else {
    Alert.alert(dict.title, dict.description);
  }
};
