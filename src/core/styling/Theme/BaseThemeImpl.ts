import {Platform, ScaledSize} from 'react-native';

import chroma, {Color} from 'chroma-js';

import {Palette} from './Coloring';
import {Font, FontWeight} from './Fonts';
import {Theme} from './Theme';
import {MediaQuery} from './Adaptive';
import {color, UniversalColor} from '../util';

export default abstract class BaseThemeImpl implements Theme {
  protected constructor(
    private readonly _window: ScaledSize,
    private readonly _screen: ScaledSize,
  ) {}

  mediaQuery(query: MediaQuery) {
    const queryKeys = Object.keys(query).map(Number);
    let result = {};
    const screenWidth = this._window.width;
    for (const q of queryKeys) {
      if (screenWidth >= q) {
        result = {...result, ...query[q]};
      }
    }
    return result;
  }

  abstract get palette(): Palette;

  chroma(this: Theme, _color: UniversalColor): Color {
    return color(_color);
  }

  mix(_back: UniversalColor, _front: UniversalColor) {
    const back = chroma(_back);
    const front = chroma(_front);
    const alpha = front.alpha();
    const r = alpha * front.get('rgb.r') + (1 - alpha) * back.get('rgb.r');
    const g = alpha * front.get('rgb.g') + (1 - alpha) * back.get('rgb.g');
    const b = alpha * front.get('rgb.b') + (1 - alpha) * back.get('rgb.b');
    return chroma.rgb(r, g, b);
  }

  fontByWeight(weight: FontWeight = 'normal', font = Font.Inter) {
    if (font === Font.Inter) {
      return Platform.select({
        android: {fontFamily: InterFontByWeightMap[weight]},
        default: {fontFamily: 'Inter', fontWeight: weight},
      });
    }
    return Platform.select({
      android: {fontFamily: RobotoFontByWeightMap[weight]},
      default: {fontFamily: 'Roboto Mono', fontWeight: weight},
    });
  }

  select<T>(this: Theme, light: T, dark: T): T {
    return chroma(this.palette['background-basic-color-1']).luminance() >= 0.5
      ? light
      : dark;
  }
}

export const InterFontByWeightMap = {
  100: 'Inter-Thin',
  200: 'Inter-ExtraLight',
  300: 'Inter-Light',
  400: 'Inter-Regular',
  normal: 'Inter-Regular',
  500: 'Inter-Medium',
  600: 'Inter-SemiBold',
  700: 'Inter-Bold',
  bold: 'Inter-Bold',
  800: 'Inter-ExtraBold',
  900: 'Inter-Black',
} as const;

export const RobotoFontByWeightMap = {
  100: 'RobotoMono-Thin',
  200: 'RobotoMono-ExtraLight',
  300: 'RobotoMono-Light',
  400: 'RobotoMono-Regular',
  normal: 'RobotoMono-Regular',
  500: 'RobotoMono-Medium',
  600: 'RobotoMono-SemiBold',
  700: 'RobotoMono-Bold',
  bold: 'RobotoMono-Bold',
  800: 'RobotoMono-Bold',
  900: 'RobotoMono-Bold',
} as const;
