import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import firebase from 'react-native-firebase';

const firestore = firebase.firestore();

class IngredientEntry extends React.Component {
  state = {
    ingredient: {
      name: '',
      defaultPicture: null,
    },
  };

  retrieveIngredientInfo() {
    const { id } = this.props;

    firestore.collection('items')
             .doc(id)
             .get()
      .then((docSnapshot) => {
        this.setState({ ingredient: docSnapshot.data() });
      });
  }

  componentDidMount() {
    this.retrieveIngredientInfo();
  }

  render() {
    const { ingredient } = this.state;
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: ingredient.defaultPicture }}
          style={styles.image}
        />
        <Text style={styles.name}>{ingredient.name}</Text>
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
  name: {
    alignSelf: 'stretch',
    textAlign: 'center',
  },
});

export default IngredientEntry;