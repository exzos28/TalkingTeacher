import {ViewStyle} from 'react-native';

import {FixedLengthArray} from 'type-fest';

export type StyleAlignItems = ViewStyle['alignItems'];
export type StyleJustifyContent = ViewStyle['justifyContent'];

export enum Gutter {
  Tiny = 4,
  Small = 8,
  Middle = 16,
  Large = 32,
}

export type AvailableGutter<G = Gutter | number> =
  | G
  | FixedLengthArray<G, 2>
  | FixedLengthArray<G, 3>
  | FixedLengthArray<G, 4>;

export enum JustifyContent {
  Start,
  End,
  Center,
  Between,
}

export enum AlignItems {
  Start,
  End,
  Center,
  Baseline,
  Stretch,
}

export enum Direction {
  Row,
  Column,
}
