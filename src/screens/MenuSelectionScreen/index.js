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

class MenuSelectionScreen extends React.Component {
  state = {
    difficulity: null,
  };

  handleDifficulityChanged = (value) => {
    this.setState({ difficulity: value });
  }

  renderIngredient = ({ item: id }) => {
    return <IngredientEntry id={id} />;
  }

  render() {
    const { navigation } = this.props;
    const { selectedItems = [] } = navigation.state.params || {};

    return (
      <View>
        <View style={styles.ingredientContainer}>
          <Text style={styles.subHeadingText}>วัตถุดิบที่เลือก</Text>
          {selectedItems.length > 0 ? (
            <FlatList
              horizontal
              data={selectedItems}
              renderItem={this.renderIngredient}
              keyExtractor={item => item}
            />
          ) : (
            <View style={styles.ingredientPlaceholder}>
              <Text>ไม่ได้เลือกวัตถุดิบไว้</Text>
            </View>
          )}
        </View>

        <View>
          <View style={styles.menuSectionHeaderContainer}>
            <Text style={styles.subHeadingText}>เมนู</Text>
            <DifficulityPicker
              selectedValue={this.state.difficulity}
              onValueChange={this.handleDifficulityChanged}
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
  ingredientPlaceholder: {
    height: 64 + (16 * 2),
    justifyContent: 'center',
    alignItems: 'center',
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
