import React from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes as GoogleSigninStatusCodes,
} from 'react-native-google-signin';
import firebase from 'react-native-firebase';

const auth = firebase.auth();

class LoginScreen extends React.Component {
  state = {
    isSigninInProgress: false,
  };

  handleSignInClick = async () => {
    this.setState({ isSigninInProgress: true });
    
    let userInfo;
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      userInfo = await GoogleSignin.signIn();
    }
    catch (error) {
      if (error.code === GoogleSigninStatusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Should be handled by GoogleSignin.hasPlayServices() dialog
      }
      else if (error.code === GoogleSigninStatusCodes.SIGN_IN_CANCELLED) {
        // Let user try again silently
        console.log('User cancel signin attempt.');
      }
      // TODO: will not work on iOS
      else if (error.message === 'NETWORK_ERROR') {
        Alert.alert(
          'ไม่สามารถติดต่อกับ Google',
          'โปรดตรวจสอบการเชื่อมต่อเครือข่ายแล้วลองอีกครั้ง'
        );
        console.log('User have no connection.');
      }
      else {
        Alert.alert(
          'การลงชื่อเข้าใช้ด้วย Google ล้มเหลว',
          'ไม่สามามารถลงชื่อเข้าใช้ด้วยเหตุผลที่ไม่รู้จัก เราจะบันทึกข้อผิดพลาดไว้'
        );
        console.error('Sign-in error:', error);
      }

      this.setState({ isSigninInProgress: false });
      return;
    }

    const credential = firebase.auth.GoogleAuthProvider.credential(
      userInfo.idToken,
      userInfo.accessToken,
    );

    try {
      await auth.signInWithCredential(credential);
    }
    catch (error) {
      Alert.alert(
        'การลงชื่อเข้าใช้ล้มเหลว',
        'ไม่สามามารถลงชื่อเข้าใช้ด้วยเหตุผลที่ไม่รู้จัก เราจะบันทึกข้อผิดพลาดไว้'
      );
      console.error('Sign-in error:', error);
      this.setState({ isSigninInProgress: false });
    }

    // Sign-in is successful
    // The root app will now redirect to MainNavigator
  }

  componentDidMount() {
    GoogleSignin.configure();
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
