import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

function HorizontalLine() {
  return <View style={styles.line} />;
}

const styles = StyleSheet.create({
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
  },
});

export default HorizontalLine;
