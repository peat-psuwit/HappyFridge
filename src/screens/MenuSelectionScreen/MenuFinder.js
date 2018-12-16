import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import TouchableItem from '../../util/TouchableItem';

const menus = [{
  _id: 'FakeID',
  name: 'แกงจืด',
  picture: 'https://c1.staticflickr.com/1/158/342339556_f9dc91b31e_z.jpg',
  difficulity: 'ค่อนข้างง่าย',
}];

class MenuFinder extends React.Component {
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
    return (
      <FlatList
        data={menus}
        renderItem={this.renderMenu}
        keyExtractor={item => item._id}
      />
    )
  }
}

const styles = StyleSheet.create({
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