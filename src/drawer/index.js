import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';

// Screens for upper drawer
import ListScreen from '../screens/ListScreen';
import ExpiredListScreen from '../screens/ExpiredListScreen';
import MenuSelectionScreen from '../screens/MenuSelectionScreen';
import MyMenuScreen from '../screens/MyMenuScreen';

// Screens for lower drawer
import AboutScreen from '../screens/AboutScreen';

import getChildNavigatorState from './getChildNavigatorState';
import DrawerItem from './DrawerItem';
import HorizontalLine from './HorizontalLine';

function getDswActiveScreen(mainState) {
  // Find DrawerSwitchNavigator state inside
  const dswState = getChildNavigatorState(mainState, ['MainStackNavigator', 'DrawerSwitchNavigator']);
  const activeItemKey = dswState.routes[dswState.index] ? dswState.routes[dswState.index].key : null;

  return activeItemKey;
}

function renderScreenItem({ navigation, screenName, screenOptions, isActive }) {
  const drawerLabel = screenOptions.drawerLabel || screenOptions.title || '';

  const handlePress = () => {
    if (isActive) {
      navigation.closeDrawer();
    }
    else {
      navigation.navigate(screenName);
    }
  }

  return (
    <DrawerItem
      key={screenName}
      label={drawerLabel}
      isActive={isActive}
      onPress={handlePress}
      style={screenOptions.drawerIndent ? styles.itemIndent : undefined}
    />
  );
}

const upperDrawerScreens = {
  ListScreen,
  ExpiredListScreen,
  MenuSelectionScreen,
  MyMenuScreen,
};

const lowerDrawerScreens = {
  AboutScreen,
};

function Drawer({ navigation }) {
  const activeScreen = getDswActiveScreen(navigation.state);

  return (
    <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        {Object.entries(upperDrawerScreens).map(([screenName, screenComponent]) => {
          const screenOptions = screenComponent.navigationOptions || {};
          const isActive = (activeScreen === screenName);

          return renderScreenItem({ navigation, screenName, screenOptions, isActive });
        })}

        <HorizontalLine />

        {Object.entries(lowerDrawerScreens).map(([screenName, screenComponent]) => {
          const screenOptions = screenComponent.navigationOptions || {};

          return renderScreenItem({ navigation, screenName, screenOptions, isActive: false });
        })}

        <DrawerItem
          key="logout"
          label="ออกจากระบบ"
          isActive={false}
          onPress={() => { /* TODO */ }}
        />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemIndent: {
    marginLeft: 32,
  },
});

export default Drawer;
