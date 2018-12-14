import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import firebase from 'react-native-firebase';

const auth = firebase.auth();

function loginAnonymously() {
  auth.signInAnonymously()
    .catch((e) => {
      console.log("Can't signin (why?): ", e);
    });
}

function LoginScreen() {
  // Stub
  return (
    <View style={styles.container}>
      <Text>Login anonymously (temporary)</Text>
      <Button title="Login" onPress={loginAnonymously} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default LoginScreen;
