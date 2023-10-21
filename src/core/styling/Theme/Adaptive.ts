import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

export interface Adaptive {
  mediaQuery(query: MediaQuery): ViewStyle | TextStyle | ImageStyle;
}

export type MediaQuery = {
  [key: number]: ViewStyle | TextStyle | ImageStyle;
};
