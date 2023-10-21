import React, {ComponentType, FC, useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {NumberProp, SvgProps} from 'react-native-svg';

// noinspection JSSuspiciousNameCombination
export default (
    Icon: ComponentType<SvgProps>,
    width: number,
    height = width,
  ): FC<SvgProps> =>
  props => {
    const {style: _style, ...rest} = props;
    const style = useMemo(
      () => StyleSheet.flatten([{width, height}, _style]),
      [_style],
    );
    const width_ = (style.width ?? width) as NumberProp;
    const height_ = (style.height ?? height) as NumberProp;
    return <Icon style={style} width={width_} height={height_} {...rest} />;
  };
