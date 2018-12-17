import React from 'react';
import { Text, View, Image, StyleSheet, FlatList } from 'react-native';
import firebase from 'react-native-firebase';

import MenuEntry from './MenuEntry';
import MyMenuScreen from './MyMenuScreen';
import TouchableItem from '../util/TouchableItem' 

const firestore = firebase.firestore();

class MenuScreen extends React.Component {

  state = {
    user : {},
    menu: {},
  }
  
  getMenu = () => {
    const menuId = this.props.navigation.getParam("menuId",'iTl3Pk4V0TMHabn7BYka');
    const auth = firebase.auth();
    const uid = auth.currentUser.uid;
    const menuRef = firestore.collection('menus');
    menuRef
      .where('menus.id', '==', menuId)
      .get().then(querySnapshot => {
        querySnapshot.forEach(obj => {
          console.log(obj.id);
        })
      })

  }

  componentDidMount(){
    this.getMenu();
  }

  handleIngredientChange = () => {
    const 
  }

  handleCookPressed = () => {

  }

  renderMenuInstruction = () => {

  }


  render () {
    const 

    return(
      <View style={styles.container}>
        <Image 
          style = {styles.image}
            source={{uri: this.state.menu.picture}}
        />
        <Text style = {style.header}> {this.state.menu.name} </Text>
        <Text style = {styles.bold}>ส่วนผสม</Text>
        <FlatList 
          data = {this.state.menu.ingredients}
          renderItem = {({item}) => {
            <Text> {"- " + item.name + item.defaultAmount + item.defaultUnit} </Text>
          }}
        />
        <Text style = {styles.bold}>วิธีทำ</Text>
        <Text> {this} </Text>
        <TouchableItem
            style = {styles.fab}
            onPress={() => {
              this.handleCookPressed();
            }}
          >
            <Image
                  style={{width: 30, height: 30}}
                    source={{uri: 'https://cdn0.iconfinder.com/data/icons/food-drinks-glyph-black/2048/Fork_and_spoon-512.png'}}
            />
        </TouchableItem>
      </View>
    );
  }

}


const  styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  image: {
    flex: 0.3,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'black',
    
  },
  header: {
    fontWeight: 'bold',
      fontSize: 25 ,
  },
  bold: {
    fontWeight: 'bold',
      fontSize: 20
  },
  fab: {
    width: 31,
    height: 31,


  },
  
});

export default MenuScreen;
