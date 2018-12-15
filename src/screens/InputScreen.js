import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, DatePickerAndroid } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

class InputScreen extends React.Component {
  // Stub
  
  state = {
    foodType: '',
    foodNum: '',
    foodExpiredDate: new Date(),
  };

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

  render(){
    const imageData = this.props.navigation.getParam("imageData","there is no spoon");
    return (
      <View style={styles.container} >
        <Image source={{uri: imageData.uri}} style={styles.image} />
        <Text>ประเภทอาหาร</Text>
        <TextInput onChangeText={(text) => this.setState({foodType:text})} style={styles.textBox} />
        <Text>ปริมาณ</Text>
        <TextInput onChangeText={(text) => this.setState({foodNum:text})} keyboardType={"number-pad"} style={styles.textBox} />
        <Text>หมดอายุ</Text>
        <TextInput onChangeText={(text) => this.setState({foodType:text})} style={styles.textBox} />
        <TouchableOpacity onPress={() => this.openAndroidDatePicker()} style={styles.textBox} >
          <Text style={{ fontSize: 14 }}> {this.state.foodExpiredDate.toDateString()} </Text>
        </TouchableOpacity>
        <Text>{this.state.foodType}</Text>
        <Text>InputScreen</Text>
        <Text>{imageData.uri}</Text>
      </View>
   );
  }



}
// defaultSource={require('../images/not-found.png')}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  image: {
    flex: 0.4,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  textBox: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  }
});

export default InputScreen;
