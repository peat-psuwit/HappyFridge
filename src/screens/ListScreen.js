import React, { Component } from 'react';
import { View, Text,StyleSheet,Image, FlatList, ActivityIndicator ,TouchableOpacity} from 'react-native';
import { List, SearchBar } from 'react-native-elements';
import firebase from 'react-native-firebase';
import moment from 'moment' ;

import TouchableItem from '../util/TouchableItem';

const firestore = firebase.firestore();

class ListScreen extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      loading: false,
      data: [],
      error: null,
      selectdata: [],
    };
    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }
  componentWillUnmount() {
    this.FrigdeSubscription();
  }
  makeRemoteRequest = () => {  
    const auth = firebase.auth();
    const uid = auth.currentUser.uid;
    const collection = firestore.collection('users')
                                .doc(uid)
                                .collection('fridgeItems')
                                .where('expDate' ,'>=' ,new Date())
                                .orderBy('expDate');
    this.FrigdeSubscription = collection.onSnapshot((snapshot) => {
        this.updateFrigdeState(snapshot.docs);
     })
  }
  updateFrigdeState(docs){
    const inFrigde = docs.map((doc) =>({
      _id: doc.id,
      ...doc.data(),
    }));
    this.setState({ data: inFrigde })
  }
  
  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={StyleSheet.absoluteFill}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => {
            return (
            <TouchableOpacity
            style = {styles.item}
            >
            <Image
                style={{width: 40, height: 40}}
                 source={{uri: item.picture}}
            />
            <View> 
            <Text style = {styles.text1}>
               {item.name}
            </Text>
            <Text style = {styles.text}>
               {"Amount: "+item.amount+" "+item.unit}
            </Text>
            <Text style = {styles.text}>
               {"ExpiredDate: "+moment(item.expDate ).format("MMM Do YY")}
            </Text></View>
            <TouchableOpacity
            onPress = {() =>this.handlePressSelect(item)}
            style = {styles.Delbut}>
             <Image
                style={{width: 30, height: 30}}
                 source={{uri: 'https://cdn0.iconfinder.com/data/icons/food-drinks-glyph-black/2048/Fork_and_spoon-512.png'}}
            />
            </TouchableOpacity>
            <TouchableOpacity
            onPress = {() => this.handlePressDel(item)}
            style = {styles.Delbut} >
             <Image
                style={{width: 30, height: 30}}
                 source={{uri: 'https://img.icons8.com/metro/1600/trash.png'}}
            />
            </TouchableOpacity>
          </TouchableOpacity>
          )}}
          keyExtractor={item => item.name}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />

        <TouchableItem
          style={styles.fab}
          onPress={() => this.props.navigation.navigate('CameraScreen')}
        >
          <Text>+</Text>
        </TouchableItem>
      </View>
    );
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };
  searchFilterFunction = text => {
      const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };
  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
      />
    );
  };
 
 handlePressDel =(item)=>{
  const auth = firebase.auth();
  const uid = auth.currentUser.uid;
  collection = firestore
    .collection('users')
    .doc(uid)
    .collection('fridgeItems')
    .doc(item._id)
    .delete()
    .then(function() {
        alert(item.name+" Document successfully deleted!");
      }).catch(function(error) {
            alert("Error removing document: ", error);
      });
 }
 handlePressSelect =(item)=>{
    //select food
    alert(item.name+" was selected")
     let selectObject = [
      item.itemId
     ];
    this.props.navigation.navigate('MenuSelectionScreen', {
      selectedItems: selectObject
    });
   }
}
ListScreen.navigationOptions = {
  title: 'ตู้เย็นของฉัน',
};

export default ListScreen;
const styles = StyleSheet.create ({
  container: {
     padding: 10,
     marginTop: 3,
     backgroundColor: '#d9f9b1',
     alignItems: 'center',
  },
  text: {
     color: '#4f603c'
  },
  text1: {
    color: '#4f603c',
    fontWeight: 'bold',
      fontSize: 20
 },
  item: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   padding: 10,
   margin: 2,
   borderColor: '#2a4944',
   borderWidth: 1
},
   Delbut: {
       alignItems: 'flex-end'
   },
   input: {
     margin: 15,
     height: 40,
     borderColor: '#7a42f4',
     borderWidth: 1
  },

  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,

    width: 56,
    height: 56,
    borderRadius: 56 / 2,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'lightgray',
  },
})
