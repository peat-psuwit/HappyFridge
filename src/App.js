import React from 'react';
import { createAppContainer } from 'react-navigation';

import { RootNavigator } from './navigators';

const NavigationContainer = createAppContainer(RootNavigator);

class App extends React.Component {
  containerRef = React.createRef();

  render() {
    return <NavigationContainer ref={this.containerRef} />;
  }
}

export default App;
