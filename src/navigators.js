import {
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

// Screens for root navigator
import AuthWaitingScreen from './screens/AuthWaitingScreen';
import LoginScreen from './screens/LoginScreen';

// Screens for drawer
import ListScreen from './screens/ListScreen';
import ExpiredListScreen from './screens/ExpiredListScreen';
import MenuSelectionScreen from './screens/MenuSelectionScreen';
import MyMenuScreen from './screens/MyMenuScreen';

// Other screens go on stack
import AboutScreen from './screens/AboutScreen';
import CameraScreen from './screens/CameraScreen';
import InputScreen from './screens/InputScreen';
import MenuScreen from './screens/MenuScreen';

const DrawerNavigator = createDrawerNavigator({
  ListScreen,
  ExpiredListScreen,
  MenuSelectionScreen,
  MyMenuScreen,
}, {
  initialRouteName: 'ListScreen',
});

DrawerNavigator.navigationOptions = {
  headerTitle: 'TODO: ดึงข้อมูลจากหน้าลูก',
};

const MainNavigator = createStackNavigator({
  DrawerNavigator,
  AboutScreen,
  CameraScreen,
  MenuScreen,
  InputScreen,
}, {
  initialRouteName: 'DrawerNavigator',
});

export const RootNavigator = createSwitchNavigator({
  AuthWaitingScreen,
  LoginScreen,
  MainNavigator,
}, {
  initialRouteName: 'AuthWaitingScreen',
});
