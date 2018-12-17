import React from 'react';
import { Text, View, Image, StyleSheet, FlatList } from 'react-native';
import firebase from 'react-native-firebase';

import TouchableItem from '../util/TouchableItem' 


// const auth = firebase.auth();
// const uid = auth.currentUser.uid;
const firestore = firebase.firestore();
const menuRef = firestore.collection('menus').doc(menuId);

class MenuScreen extends React.Component {

  static navigationOption = {
    title: 'Menu Screen'
  }

  state = {
    menu: {},
    fItemList: [],
  }

  componentDidMount(){
    this.get
  }

  handleCookPressed = () =>{
    
  }


  render () {


    return;
  }

}


const  styles = StyleSheet.create({



  // container: {

  // },
  
  // image: {
    
  // },
  
});

export default MenuScreen;
