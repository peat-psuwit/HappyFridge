import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, DatePickerAndroid } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import SearchableDropDown from 'react-native-searchable-dropdown';
import firebase from 'react-native-firebase';

class InputScreen extends React.Component {
  state = {
    foodType: '',
    foodAmount: 0,
    foodExpiredDate: new Date(),
    foodUnit: 'ชิ้น',
    foodId: '',
    displayPicURL: '',
    items:[],
    haveTakePic: false,
  };

  componentDidMount() {
    this.getItem();
  }

  openAndroidDatePicker = async function() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date()
      });
      console.log(action, year, month, day);
      if(action === DatePickerAndroid.dateSetAction){
        let date = new Date(year, month, day);
        this.setState({
          foodExpiredDate: date
        });
      }
      else if(action === DatePickerAndroid.dismissedAction){
        console.log("User cancel DatePickerAndroid");
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  setItemForUpload = (url = false) => {
    let tmpObject = {};
    tmpObject.picture = url ? url : this.state.displayPicURL;
    tmpObject.itemId = this.state.foodId,
    tmpObject.name = this.state.foodType,
    tmpObject.amount = this.state.foodAmount,
    tmpObject.unit = this.state.foodUnit,
    tmpObject.expDate = this.state.foodExpiredDate

    return tmpObject;
  }

  fridgeItemUploadAndNavigate = () => {
    const auth = firebase.auth();
    const uid = auth.currentUser.uid;
    const fridgeItemRef = firebase.firestore().collection(`users/${uid}/fridgeItems`).doc();
    if(this.state.haveTakePic){
      firebase.storage()
      .ref(`users/${uid}/fridgeItems/${fridgeItemRef.id}.jpg`)
      .putFile(this.state.displayPicURL)
      .catch(err => {
      console.log("Error:", err);
    }).then(() => {
      firebase.storage()
    .ref(`users/${uid}/fridgeItems/${fridgeItemRef.id}.jpg`)
    .getDownloadURL()
    .then((url) => {
      let tmpObject = this.setItemForUpload(url);
      fridgeItemRef.set(tmpObject)
      this.props.navigation.navigate('ListScreen');
      })
    })
    }
    else {
      let tmpObject = this.setItemForUpload();
      fridgeItemRef.set(tmpObject)
      this.props.navigation.navigate('ListScreen');
    }
  }

  getItem = () => {
    const itemsRef = firebase.firestore().collection('items')
    const imageData = this.props.navigation.getParam("imageData",false);
    if(imageData !== false){
      this.setState({
        displayPicURL: imageData.uri,
        haveTakePic: true
      })
    }
    itemsRef.get().then(QuerySnapshot => {
      this.setState({
        items: QuerySnapshot.docs.map(obj => {
                    return {id:obj.id, data:obj.data()}
               })
      }) 
    })
  }

  setFoodTypeAndUnit = (item) => {
    this.state.items.forEach( obj => {
      if(obj.data.name === item.name) {
        this.setState({
          foodType: item.name,
          foodUnit: obj.data.defaultUnit,
          foodId: obj.id,
        })
        if(!this.state.haveTakePic){
          this.setState({
            displayPicURL: obj.data.defaultPicture
          })
        }
      }
    })
  }

  render(){
    return (
      <View style={styles.container} >
        <Image source={{uri: this.state.displayPicURL}} style={styles.image} />

        <View style={{flex:0.3}} >
          <Text style={{flex:0.2}} >ประเภทอาหาร</Text>
          <SearchableDropDown 
          style={{flex:0.8}}
          onItemSelect={(item) => this.setFoodTypeAndUnit(item)}
          items={this.state.items.map(obj => {
            return {name: obj.data.name}
          })}
          itemTextStyle={{color:'black'}}
          containerStyle={{height:140, flex: 0.8}}
          itemsContainerStyle={{maxHeight: 140, height:20, flex:0.8}}
          underlineColorAndroid="black"
          placeholder="เลือกชนิดวัตถุดิบ"
          />
        </View>
        
        <View style={{flex:0.15, flexDirection:'column'}}>
          <Text style={{flex:0.4}} >ปริมาณ</Text>
          <View style={styles.amountBox} >
            <TextInput 
              onChangeText={(text) => this.setState({foodAmount:parseInt(text)})} 
              keyboardType={"number-pad"}  
              style={{flex:0.8, borderBottomColor: 'gray', borderBottomWidth: 1,}}
              />
            <Text style={{flex:0.2}}>{this.state.foodUnit}</Text>
          </View>
        </View>

        <View style={{flex:0.15}} >
          <Text style={{flex:0.5}} >หมดอายุ</Text>
          <TouchableOpacity onPress={() => this.openAndroidDatePicker()} style={styles.textBox} >
            <Text style={{ fontSize: 14, flex:1 }}> {this.state.foodExpiredDate.toDateString()} </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.submitButton}>
          <TouchableOpacity onPress={() => this.fridgeItemUploadAndNavigate()}
          style={{ justifyContent:'center', alignItems:'center' }}
          >
          <Text style={{ fontSize: 14, justifyContent:'center', alignItems:'center' }}> บันทึก </Text>
          </TouchableOpacity>
        </View>

      </View>
   );
  }
}

const styles = StyleSheet.create({
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
  amountBox: {
    flex: 0.6,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  },
  textBox: {
    flex: 0.5,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  itemsContainer: {
    maxHeight: 140,
    height:20,
    flex: 0.8,
  },
  submitButton:{
    flex:0.1,
    borderWidth: 2, 
    borderBottomColor: 'gray',
    backgroundColor: 'gray',
    opacity:0.2
  }
});

export default InputScreen;
