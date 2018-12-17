import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  GoogleSigninButton,
} from 'react-native-google-signin';

import HFAuth from '../util/HFAuth';

class LoginScreen extends React.Component {
  state = {
    isSigninInProgress: false,
  };

  handleSignInClick = async () => {
    this.setState({ isSigninInProgress: true });
    
    try {
      await HFAuth.signInWithGoogleSignIn();
    }
    catch (error) {
      this.setState({ isSigninInProgress: false });
      return;
    }

    // Sign-in is successful
    // The root app will now redirect to MainNavigator
  }

  render() {
    const { isSigninInProgress } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.headingText}>Happy</Text>
        <Text style={styles.headingText}>Fridge</Text>

        <View style={styles.signInButtonContainer}>
          <GoogleSigninButton
            style={styles.signInButton}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this.handleSignInClick}
            disabled={isSigninInProgress}
          />
          {isSigninInProgress ? (
            <ActivityIndicator
              size="small"
              style={styles.signInButtonActivity}
            />
          ) : null}
        </View>
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
  signInButtonContainer: {
    // Size is recommended from RN-google-signin
    width: 312,
    height: 48,

    marginTop: 48,
  },
  signInButton: {
    // Size is recommended from RN-google-signin
    width: 312,
    height: 48,
  },
  signInButtonActivity: {
    position: 'absolute',
    width: 24,
    height: 24,
    // Position this in the middle of the button
    left: (312 - 24) / 2,
    top: (48 - 24) / 2,
  },
});

export default LoginScreen;
