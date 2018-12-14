import {
  createDrawerNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import AuthWaitingScreen from './screens/AuthWaitingScreen';
import LoginScreen from './screens/LoginScreen';

import ListScreen from './screens/ListScreen';

const MainNavigator = createDrawerNavigator({
  ListScreen,
}, {
  initialRouteName: 'ListScreen',
});

export const RootNavigator = createSwitchNavigator({
  AuthWaitingScreen,
  LoginScreen,
  MainNavigator,
}, {
  initialRouteName: 'AuthWaitingScreen',
});
