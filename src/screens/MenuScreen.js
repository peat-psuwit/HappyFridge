import React from 'react';
import { Text, View, Image, StyleSheet, FlatList, } from 'react-native';
import firebase from 'react-native-firebase';

import MenuEntry from './MenuEntry';
import MyMenuScreen from './MyMenuScreen';
import TouchableItem from '../util/TouchableItem' 

const firestore = firebase.firestore();

class MenuScreen extends React.Component {

  state = {
    menu: {
      ingredients: {},
    },
  }
  
  getMenu = () => {
    const menuId = this.props.navigation.getParam("menuId");
    const auth = firebase.auth();
    const uid = auth.currentUser.uid;
    const menuRef = firestore.collection('menus');

    menuRef
      .doc(menuId)
      .get().then(querySnapshot => {
        console.log(querySnapshot)
        this.setState({
          menu: {id: querySnapshot.id, ...querySnapshot.data()}
        })
      })

     
    }

  componentDidMount(){
    this.getMenu();
  };

  handleIngredientChange = ({ingredients}) => {

  };

  handleCookPressed = () => {
     
  };


  render () { 
    // console.log(this.state.menu.ingredients); 
    const test = Object.keys(this.state.menu.ingredients).map((key) => {
      return {
        id: key,
        ...this.state.menu.ingredients[key]
      }
    });
    // console.log(test);
    return(
      <View style={styles.container}>
        <Image 
          style = {styles.image}
            source={{uri: this.state.menu.picture}}
        />
        <Text style = {styles.header}> {this.state.menu.name + "\n"} </Text>
        <Text style = {styles.bold}>ส่วนผสม</Text>
        <View>
          <FlatList 
            data = {test}
            renderItem = {({item}) => {
              console.log(item);
              return (
                <Text>{" - " + item.name + " " + item.defaultAmount + " " + item.defaultUnit }</Text>
              );
            }}
          />
        </View>
        <Text style = {styles.bold}>วิธีทำ</Text>
        <Text> {this.state.menu.instruction} </Text>
        <TouchableItem
            style = {styles.fab}
            onPress={() => {
              this.handleCookPressed();
            }}
          >
            <Image
                  style={{width: 59, height: 59}}
                    source={{uri: 'https://cdn0.iconfinder.com/data/icons/food-drinks-glyph-black/2048/Fork_and_spoon-512.png'}}
            />
        </TouchableItem>
      </View>
    );
  }

}


const  styles = StyleSheet.create({
  container: {
    padding : 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  image: {
    flex: 0.4,
    flexDirection: 'column',
    // alignItems: 'stretch',
    // backgroundColor: 'black',
    
  },
  header: {
    fontWeight: 'bold',
      fontSize: 30 ,
  },
  bold: {
    fontWeight: 'bold',
      fontSize: 17
  },
  fab: {
    width: 60,
    height: 60,

    // flex: 0.1,
    // // flexDirection: 'row-reverse',
    // justifyContent: 'flex-end',
  },
  
});

export default MenuScreen;
