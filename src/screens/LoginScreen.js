import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  GoogleSigninButton,
} from 'react-native-google-signin';
import firebase from 'react-native-firebase';

const auth = firebase.auth();

class LoginScreen extends React.Component {
  state = {
    isSigninInProgress: false,
  };

  handleSignInClick = () => {
    // TODO
  }

  render() {
    const { isSigninInProgress } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.headingText}>Happy</Text>
        <Text style={styles.headingText}>Fridge</Text>

        <GoogleSigninButton
          style={styles.signInButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this.handleSignInClick}
          disabled={isSigninInProgress}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  signInButton: {
    // Size is recommended from RN-google-signin
    width: 312,
    height: 48,
    marginTop: 48,
  },
});

export default LoginScreen;
