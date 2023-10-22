import {BottomTabParamList} from '../BottomTabNavigator';
import {NavigatorScreenParams} from '@react-navigation/native';

export type RootParamList = {
  Root: NavigatorScreenParams<BottomTabParamList>;
  CreateChat: undefined;
  Chat: undefined;
  Log: undefined;
  PickLanguageForSettings: undefined;
};
