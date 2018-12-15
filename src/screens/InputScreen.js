import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

function InputScreen({ navigation }) {
  // Stub
  const imageData = navigation.getParam("imageData","there is no spoon");
  return (
    <View style={styles.container} >
      <Image source={{uri: imageData.uri}} style={styles.image} />
      <Text>InputScreen</Text>
      <Text>{imageData.uri}</Text>
      
    </View>
  );
}
// defaultSource={require('../images/not-found.png')}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  image: {
    flex: 0.4,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'black',
  }
  });

export default InputScreen;
