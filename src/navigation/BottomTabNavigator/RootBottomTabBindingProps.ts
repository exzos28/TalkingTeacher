import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '../RootNavigator';
import {BottomTabParamList} from './BottomTabParamList';

export type RootBottomTabBindingProps<S extends keyof BottomTabParamList> = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<BottomTabParamList, S>,
    StackNavigationProp<RootParamList>
  >;
  route: RouteProp<BottomTabParamList, S>;
};
