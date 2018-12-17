import React, {Component} from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';

function CameraScreen({ navigation }) {
  takePicture = async function(camera) {
    const options = { quality: 0.5, fixOrientation: true };
    const data = await camera.takePictureAsync(options);
    navigation.navigate("InputScreen", { imageData:data });
  }

  return (
<View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
        >
          {({ camera }) => {
            return (
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                  <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("InputScreen")} style={styles.capture} >
                  <Text style={{ fontSize: 14 }}> SKIP PICTURE </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      </View>
  );
}




const styles = StyleSheet.create({
container: {
  flex: 1,
  flexDirection: 'column',
  backgroundColor: 'black',
},
preview: {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
},
capture: {
  flex: 0,
  backgroundColor: '#fff',
  borderRadius: 5,
  padding: 15,
  paddingHorizontal: 20,
  alignSelf: 'center',
  margin: 20,
},
});

export default CameraScreen;
