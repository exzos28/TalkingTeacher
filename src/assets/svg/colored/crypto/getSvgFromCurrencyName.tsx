import React from 'react';

import {SvgProps} from 'react-native-svg';

import {RoxSvg, SolSvg, TetherSvg, UsdcSvg} from './index';

export type CurrencyName = 'ROX' | 'USDT' | 'USDC' | 'SOL' | string;

const map = new Map<CurrencyName, React.ComponentType<SvgProps>>([
  ['ROX', RoxSvg],
  ['USDT', TetherSvg],
  ['USDC', UsdcSvg],
  ['SOL', SolSvg],
]);

export default function getSvgFromCurrencyName(
  name: CurrencyName,
): React.ComponentType<SvgProps> | undefined {
  return map.get(name);
}
