import React from 'react';
import { createAppContainer, NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';

const auth = firebase.auth();

import { RootNavigator } from './navigators';

const NavigationContainer = createAppContainer(RootNavigator);

class App extends React.Component {
  containerRef = React.createRef();
  previousAuth = undefined;
  authSubscription = null;

  navigateTo(routeName) {
    const container = this.containerRef.current;
    if (!container) {
      throw new Error('NavigationContainer missing?');
    }

    container.dispatch(
      NavigationActions.navigate({
        routeName,
      })
    );
  }

  handleAuthStateChanged = (auth) => {
    if (this.previousAuth === auth) {
      return;
    }

    if (auth) {
      this.navigateTo('MainNavigator');
    }
    else {
      this.navigateTo('LoginScreen');
    }

    this.previousAuth = auth;
  }

  componentDidMount() {
    this.authSubscription =
      auth.onAuthStateChanged(this.handleAuthStateChanged);
  }

  componentWillUnmount() {
    if (this.authSubscription) {
      this.authSubscription();
    }
  }

  render() {
    return <NavigationContainer ref={this.containerRef} />;
  }
}

export default App;
