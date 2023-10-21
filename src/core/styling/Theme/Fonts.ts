import {TextStyle} from 'react-native';

export interface Fonts {
  fontByWeight(weight?: FontWeight, font?: Font): TextStyle;
}

export type FontWeight = NonNullable<TextStyle['fontWeight']>;

export enum Font {
  Inter,
  Roboto,
}
