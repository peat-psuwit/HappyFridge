import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import IngredientEntry from './IngredientEntry';
import DifficulityPicker from './DifficulityPicker';
import MenuFinder from './MenuFinder';

const items = ['0011000'];

class MenuSelectionScreen extends React.Component {
  renderIngredient = ({ item: id }) => {
    return <IngredientEntry id={id} />;
  }

  render() {
    return (
      <View>
        <View style={styles.ingredientContainer}>
          <Text style={styles.subHeadingText}>วัตถุดิบที่เลือก</Text>
          <FlatList
            horizontal
            data={items}
            renderItem={this.renderIngredient}
            keyExtractor={item => item}
          />
        </View>

        <View>
          <View style={styles.menuSectionHeaderContainer}>
            <Text style={styles.subHeadingText}>เมนู</Text>
            <DifficulityPicker
              selectedValue={null}
              style={styles.picker}
            />
          </View>

          <MenuFinder />
        </View>
      </View>
    );
  }
}

MenuSelectionScreen.navigationOptions = {
  title: 'ค้นหาเมนู',
};

const styles = StyleSheet.create({
  ingredientContainer: {
    paddingHorizontal: 16,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  menuSectionHeaderContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picker: {
    width: 200,
    height: 50,

    marginTop: 8,
  },
  subHeadingText: {
    fontSize: 18,
    fontWeight: 'bold',

    marginTop: 16,
  },
});

export default MenuSelectionScreen;
