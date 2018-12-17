import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import firebase from 'react-native-firebase';

const firestore = firebase.firestore();

import TouchableItem from '../../util/TouchableItem';

class MenuFinder extends React.Component {
  state = {
    menus: null,
  }

  buildAndSubscribeToQuery() {
    const { ingredients, difficulity } = this.props;

    let query = firestore
      .collection('menus');

    query = ingredients.reduce((query, ingredient) => (
      query.where(`ingredientMap.${ingredient}`, '==', true)
    ), query);

    if (difficulity) {
      query = query.where('difficulity', '==', difficulity);
    }

    this.unsubscribe = query.onSnapshot((qSnapshot) => {
      const menus = qSnapshot.docs.map((docSnapshot) => ({
        _id: docSnapshot.id,
        ...docSnapshot.data(),
      }));

      this.setState({ menus });
    });
  }

  componentDidMount() {
    this.buildAndSubscribeToQuery();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.ingredients !== this.props.ingredients ||
        prevProps.difficulity !== this.props.difficulity)
    {
      this.unsubscribe();
      this.buildAndSubscribeToQuery();

      this.setState({ menus: null });
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  renderMenu = ({ item }) => {
    return (
      <TouchableItem>
        <View style={styles.menuContainer}>
          <Image
            source={{ uri: item.picture }}
            style={styles.menuImage}
          />

          <View>
            <Text style={styles.menuName}>{item.name}</Text>
            <Text>ระดับความยาก: {item.difficulity}</Text>
          </View>
        </View>
      </TouchableItem>
    );
  }

  render() {
    const { menus } = this.state;
    
    if (!menus) {
      return (
        <View style={styles.placeholderContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    
    if (menus.length === 0) {
      return (
        <View style={styles.placeholderContainer}>
          <Text>ไม่พบเมนูที่ตรงกับเงื่อนไข</Text>
        </View>
      )
    }

    return (
      <FlatList
        data={menus}
        renderItem={this.renderMenu}
        keyExtractor={item => item._id}
      />
    );
  }
}

const styles = StyleSheet.create({
  placeholderContainer: {
    alignItems: 'center',
  },
  menuContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  menuImage: {
    width: 64,
    height: 64,
    borderRadius: 32,

    marginRight: 16,
  },
  menuName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MenuFinder;