import React from 'react';
import firebase from 'react-native-firebase';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const firestore = firebase.firestore();

class MenuEntry extends React.Component {
  state = {
    menu: {},
  };

  subscribeToFirestore() {
    const { id } = this.props;
    const docRef = firestore.collection('menus').doc(id)
    this.userSubscription = docRef.onSnapshot((doc) => {
      this.setState({ menu : doc.data() });
    });
  }

  handlePressed = () => {
    const { id, onPress } = this.props;
    onPress(id);
  }

  componentDidMount() {
    this.subscribeToFirestore();
  }

  render() {
    const { menu } = this.state;
    const {
      name,
      picture,
    } = menu;

    return (
      <TouchableHighlight
        onPress={this.handlePressed}
        style={styles.touchable}
      >
        <View style={styles.container}>
          <Image
            source={{ uri : picture}}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{name}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: 'white',
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 40,
  },
  textContainer: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artist: {
    fontWeight: 'normal',
  }
});

export default MenuEntry;