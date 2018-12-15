import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
} from 'react-native';

import TouchableItem from '../util/TouchableItem';

import hamburger_icon from '../../assets/hamburger-icon.png';

// Copied from React Navigation
const TITLE_OFFSET_LEFT_ALIGN = Platform.OS === 'ios' ? 20 : 56;

function HamburgerButton({ onPress }) {
  return (
    <TouchableItem style={styles.item} onPress={onPress}>
      <Image source={hamburger_icon} fadeDuration={0} />
    </TouchableItem>
  );
}

const styles = StyleSheet.create({
  item: {
    width: TITLE_OFFSET_LEFT_ALIGN,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default HamburgerButton;
