import React from 'react';
import {
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

// Screens for root navigator
import AuthWaitingScreen from '../screens/AuthWaitingScreen';
import LoginScreen from '../screens/LoginScreen';

// Screens for drawer
import ListScreen from '../screens/ListScreen';
import ExpiredListScreen from '../screens/ExpiredListScreen';
import MenuSelectionScreen from '../screens/MenuSelectionScreen';
import MyMenuScreen from '../screens/MyMenuScreen';

// Other screens go on stack
import AboutScreen from '../screens/AboutScreen';
import CameraScreen from '../screens/CameraScreen';
import InputScreen from '../screens/InputScreen';
import MenuScreen from '../screens/MenuScreen';

import Drawer from '../drawer';

import HamburgerButton from './HamburgerButton';

const drawerRoutes = {
  ListScreen,
  ExpiredListScreen,
  MenuSelectionScreen,
  MyMenuScreen,
};

const DrawerSwitchNavigator = createSwitchNavigator(drawerRoutes, {
  initialRouteName: 'ListScreen',
  backBehavior: 'initialRoute',
});

DrawerSwitchNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  return {
    ...(drawerRoutes[routeName].navigationOptions || {}),
    headerLeft: <HamburgerButton onPress={() => navigation.toggleDrawer()} />
  }
};

const MainStackNavigator = createStackNavigator({
  DrawerSwitchNavigator,
  AboutScreen,
  CameraScreen,
  MenuScreen,
  InputScreen,
}, {
  initialRouteName: 'DrawerSwitchNavigator',
});

const MainNavigator = createDrawerNavigator({
  MainStackNavigator,
}, {
  initialRouteName: 'MainStackNavigator',
  contentComponent: Drawer,
  backBehavior: 'none',
});

export const RootNavigator = createSwitchNavigator({
  AuthWaitingScreen,
  LoginScreen,
  MainNavigator,
}, {
  initialRouteName: 'AuthWaitingScreen',
});
