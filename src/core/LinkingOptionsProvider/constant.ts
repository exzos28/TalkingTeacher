import {LinkingOptions, ParamListBase} from '@react-navigation/native';
import {Url} from '../units';

export const MOBILE_PREFIX = 'com.talkingteacher://' as Url;

export const PREFIXES: LinkingOptions<ParamListBase>['prefixes'] = [
  MOBILE_PREFIX,
];
