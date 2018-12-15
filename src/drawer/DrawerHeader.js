import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { withOrientation } from 'react-navigation';

const getAppBarHeight = isLandscape => {
  return Platform.OS === 'ios'
    ? isLandscape && !Platform.isPad
      ? 32
      : 44
    : 56;
};

function DrawerHeader({ isLandscape }) {
  const height = getAppBarHeight(isLandscape);

  return (
    <View style={[styles.header, { height }]}>
      <Text style={styles.headerText}>Happy Fridge</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',

    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerText: {
    fontSize: Platform.OS === 'ios' ? 17 : 20,
    fontWeight: Platform.OS === 'ios' ? '600' : '500',
    color: 'rgba(0, 0, 0, .9)',
    marginHorizontal: 16,
  },
});

export default withOrientation(DrawerHeader);
