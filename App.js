import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions} from 'react-native';
import WelcomeScreen from './js/ui-components/WelcomeScreen';
import SignupScreen from './js/ui-components/SignupScreen';
import { Provider, connect } from 'react-redux'
import store from './js/store'
import {
  ViroARSceneNavigator,
} from 'react-viro';

// TESTING INSTRUCTIONS
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// ADD FLOW TYPES TO REACT COMPONENTS? https://flow.org/en/docs/react/components/
// type Props = {};
// export default class App extends Component<Props> {

var sharedProps = {
  apiKey: "C53DE6A2-B177-4757-97D9-4855405BC265",     // this is passed to ViroARSceneNavigator
};

class DcApp extends Component {
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
      // ORIGINAL DISPLAY
      // <View style={styles.container}>
      //   <Text style={styles.welcome}>Welcome to React Native!</Text>
      //   <Text style={styles.instructions}>To get started, edit App.js</Text>
      //   <Text style={styles.instructions}>{instructions}</Text>
      // </View>

      // LOGIN DISPLAY
      // <View style={styles.container}>
      //   {this.state.user.name ? (
      //     <WelcomeScreen user={this.state.user} />
      //   ) : (
      //     <SignupScreen />
      //   )}
      // </View>

      // AR SCENE
      <View style={{ flex: 1 }} >
        <ViroARSceneNavigator {...sharedProps}
          initialScene={{ scene: require('./ARScene.js') }}
          worldAlignment="Gravity"
          debug={true}
        />
        {/* crosshair is its on view, following a stylesheet */}
        <View style={styles.crosshair} />
      </View>
    );
  }
}

// STYLESHEETS

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
    marginBottom: 5,
  },
  crosshair: {
    position: 'absolute',
    top: (Dimensions.get('window').height / 2) - 2,
    left: (Dimensions.get('window').width / 2) - 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    borderWidth: 1,
    backgroundColor: 'red',
  },
});

const App = connect(
  null,
  null
)(DcApp);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);