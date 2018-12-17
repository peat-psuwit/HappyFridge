import React from 'react';
import firebase from 'react-native-firebase';
import {View, Text, FlatList} from 'react-native';

const firestore = firebase.firestore();

import MenuEntry from './MenuEntry';

class MyMenuScreen extends React.Component {   
  state = {
    user: {},
  };
  
  handleMenuSelected = (id) => {
    const { navigation } = this.props;

    navigation.navigate('MenuScreen', { menuId: id });
  }

  subscribeToFirestore() {
    const auth = firebase.auth();
    const uid = auth.currentUser.uid;
    const docRef = firestore.collection('users').doc(uid)
    this.userSubscription = docRef.onSnapshot((doc) => {
      this.setState({ user : doc.data() });
    });
  }

  unsubscribeFromFirestore() {
    this.subscription();
  }

  componentDidMount() {
    this.subscribeToFirestore();
  }

  componentWillUnmount() {
     this.unsubscribeFromFirestore();
  }

  renderItem = (props) => {
    const { item } = props;
    return (
      <MenuEntry id={item} onPress={this.handleMenuSelected}></MenuEntry>
    );
  }

  render() {
    const { user } = this.state;
    const { favorites } = user;
      return (
        <FlatList
        data={favorites}
        renderItem={this.renderItem}
        keyExtractor={keyExtractor}
        />
      );
    }
}

function keyExtractor(item) {
  return item;
}

MyMenuScreen.navigationOptions = {
  title: 'เมนูของฉัน',
  drawerIndent: true,
};

export default MyMenuScreen;
