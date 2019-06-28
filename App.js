/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './js/ui-components/WelcomeScreen';
import SignupScreen from './js/ui-components/SignupScreen';
import { Provider, connect } from 'react-redux'
import store from './js/store'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
});

type Props = {};
class DcApp extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    this.setState({
      user: {
        name: 'Cody',
        email: 'cody@cody.com'
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.user.name ? (
          <WelcomeScreen user={this.state.user} />
        ) : (
          <SignupScreen />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

const App = connect(
  null,
  null
)(DcApp)

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)
