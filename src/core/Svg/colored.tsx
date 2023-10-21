import {SvgProps} from 'react-native-svg';
import React, {FC, ComponentType} from 'react';
import {ColorValue} from 'react-native';

export default (
    Icon: ComponentType<SvgProps>,
    color: ColorValue,
  ): FC<SvgProps> =>
  props =>
    <Icon color={color} {...props} />;
