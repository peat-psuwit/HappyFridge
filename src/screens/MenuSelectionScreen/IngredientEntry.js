import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

class IngredientEntry extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Schweinebauch-2.jpg/330px-Schweinebauch-2.jpg' }}
          style={styles.image}
        />
        <Text>{id}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: 64 + (16 * 2),
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,

    marginBottom: 8,
  },
});

export default IngredientEntry;