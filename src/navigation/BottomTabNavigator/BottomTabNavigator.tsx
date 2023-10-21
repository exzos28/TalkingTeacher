import React from 'react';
import {observer} from 'mobx-react-lite';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashboardBinding from './DashboardBinding';
import {BottomTabParamList} from './BottomTabParamList';
import DebugBinding from './DebugBinding';
import {useRoot} from '../../core/Root/hooks';

const {Navigator, Screen} = createBottomTabNavigator<BottomTabParamList>();

export default observer(function BottomTabNavigator() {
  const {debug} = useRoot();
  return (
    <Navigator initialRouteName="Dashboard">
      <Screen name="Dashboard" component={DashboardBinding} />
      {debug.debugEnabled && <Screen name="Debug" component={DebugBinding} />}
    </Navigator>
  );
});

// const BottomTabBar = observer(
//   ({navigation, state, insets}: BottomTabBarProps) => {
//     const strings = useStrings();
//     const bottom = Platform.OS === 'ios' ? insets.bottom / 2 : insets.bottom;
//     return (
//       <Layout level="1" style={{paddingBottom: bottom}}>
//         <BottomNavigation
//           indicatorStyle={{height: 1}}
//           style={{backgroundColor: 'transparent'}}
//           selectedIndex={state.index}
//           onSelect={index => navigation.navigate(state.routeNames[index])}>
//           <BottomNavigationTab
//             icon={renderPersonIcon}
//             title={props => (
//               <TabTitle {...props}>{strings['bottomTab.account']}</TabTitle>
//             )}
//           />
//           <BottomNavigationTab
//             icon={renderCoin}
//             title={props => (
//               <TabTitle {...props}>{strings['bottomTab.earnCoins']}</TabTitle>
//             )}
//           />
//           <BottomNavigationTab
//             icon={renderPeopleIcon}
//             title={props => (
//               <TabTitle {...props}>{strings['bottomTab.spendCoins']}</TabTitle>
//             )}
//           />
//           <BottomNavigationTab
//             icon={renderSettingsIcon}
//             title={props => (
//               <TabTitle {...props}>{strings['bottomTab.settings']}</TabTitle>
//             )}
//           />
//         </BottomNavigation>
//       </Layout>
//     );
//   },
// );
//
// const TabTitle = observer((props: TextProps) => {
//   const {style, ...rest} = props;
//   const styles = useStyles(() => ({
//     root: {
//       fontSize: 11,
//       textTransform: 'uppercase',
//       fontWeight: 'bold',
//     },
//   }));
//   const style_ = useMemo(
//     () => StyleSheet.flatten([style, styles.root]),
//     [style, styles],
//   );
//
//   return (
//     <Text
//       adjustsFontSizeToFit
//       numberOfLines={1}
//       {...rest}
//       style={[styles.root, style_]}
//     />
//   );
// });
//
// export const renderPersonIcon = (props: IconProps) => (
//   <Icon name="person-outline" {...props} />
// );
// export const renderCoin = (props: IconProps) => (
//   <Icon name="stop-circle" {...props} />
// );
// export const renderPeopleIcon = (props: IconProps) => (
//   <Icon name="people-outline" {...props} />
// );
// export const renderSettingsIcon = (props: IconProps) => (
//   <Icon name="settings-outline" {...props} />
// );
