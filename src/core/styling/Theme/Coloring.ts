import {Color} from 'chroma-js';
import lightPalette from './lightPalette';
import {UniversalColor} from '../util';

export interface Coloring {
  readonly palette: Readonly<Palette>;

  chroma(color: UniversalColor): Color;

  mix(back: UniversalColor, front: UniversalColor): Color;
}

export type Palette = {
  [P in ColorKey]: string;
};

export type ColorKey = keyof typeof lightPalette;
