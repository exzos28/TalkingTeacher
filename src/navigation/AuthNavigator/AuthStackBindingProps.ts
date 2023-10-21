import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {AuthParamList} from './AuthParamList';

export type AuthStackBindingProps<S extends keyof AuthParamList> = {
  navigation: StackNavigationProp<AuthParamList, S>;
  route: RouteProp<AuthParamList, S>;
};
