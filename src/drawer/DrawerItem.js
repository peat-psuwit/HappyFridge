import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import TouchableItem from '../util/TouchableItem';

function DrawerItem({
  label,
  isActive,
  onPress,
  style,
}) {
  const extraItemStyle = isActive ? styles.activeItem : styles.inactiveItem;
  const extraLabelStyle = isActive ? styles.activeLabel : styles.inactiveLabel;

  return (
    <TouchableItem onPress={onPress} delayPressIn={0}>
      <View style={[styles.item, extraItemStyle, style]}>
        <Text style={[styles.label, extraLabelStyle]}>
          {label}
        </Text>
      </View>
    </TouchableItem>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeItem: {
    backgroundColor: 'rgba(0, 0, 0, .04)',
  },
  inactiveItem: {
    backgroundColor: 'transparent',
  },
  label: {
    margin: 16,
    fontWeight: 'bold',
  },
  activeLabel: {
    color: '#2196f3',
  },
  inactiveLabel: {
    color: 'rgba(0, 0, 0, .87)',
  },
});

export default DrawerItem;
