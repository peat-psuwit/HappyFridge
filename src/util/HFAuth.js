import { Alert } from 'react-native';
import {
  GoogleSignin,
  statusCodes as GoogleSigninStatusCodes,
} from 'react-native-google-signin';
import firebase from 'react-native-firebase';

const auth = firebase.auth();

GoogleSignin.configure();

const HFAuth = {
  onAuthStateChanged(listener) {
    return auth.onAuthStateChanged(listener);
  },

  async signInWithGoogleSignIn() {
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

      throw error;
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

      throw error;
    }
  },

  async signOut() {
    await Promise.all([
      GoogleSignin.signOut(),
      auth.signOut(),
    ]);
  },
};

export default HFAuth;