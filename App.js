import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';
import WelcomeScreen from './js/Comps/UI/WelcomeScreen';
import SigninScreen from './js/Comps/UI/SigninScreen';
import { Provider, connect } from 'react-redux';
import store, { loginThunk, getActiveLocationThunk } from './js/store';
import { ViroARSceneNavigator } from 'react-viro';

import Geolocation from 'react-native-geolocation-service';

const keyRing = [
  '5C6EF69F-7244-462B-B067-37CBC6FB6093',
  '53ECFECF-D5F2-43F0-A8CE-C2CA87613B4D',
  'C53DE6A2-B177-4757-97D9-4855405BC265',
  '1FF8955D-8B22-4A90-9A68-CF5A12817107'
]

var sharedProps = {
  apiKey: keyRing[Math.floor(Math.random()*4)]
};

const Game = () => (
  // AR SCENE
  <View style={{ flex: 1 }}>
    <ViroARSceneNavigator
      {...sharedProps}
      initialScene={{ scene: require('./js/Comps/AR/ARScene.js') }}
      worldAlignment="GravityAndHeading"
      debug={true}
    />
    {/* crosshair is its own view, following a stylesheet */}
    <View style={styles.crosshair} />
  </View>
);

class DcApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
    };
    // method binds
    this.startGame = this.startGame.bind(this);
    this._updateLocation = this._updateLocation.bind(this);
  }

  componentWillMount() {
    console.log('APP.JS COMPONENT WILL MOUNT');
    this._updateLocation();
  }

  _updateLocation() {
    console.log('NOW INSIDE APP.JS _UPDATELOCATION!');

    if (Platform.OS === 'android') {
      // FOR NOW, WE ARE USING DUMMY DATA FOR ANDROID INSTEAD OF INVOKING THIS._UPDATELOCATION
      this.props.getActiveLocation([40.7050975, -74.00901303])
    } else {    // ios
      Geolocation.getCurrentPosition(
        position => {
          console.log('POSITION:', position);
          this.props.getActiveLocation([
            position.coords.latitude,
            position.coords.longitude
          ]);
        },
        error => { console.log('ERR0R:', error.message) },
        {
          enableHighAccuracy: true,
          timeout: 25000,
          maximumAge: 3600000
        }
      );
    }
  }

  render() {
    if (this.state.playing) {
      return <Game />;
    }
    return (
      <View style={styles.container}>
        {this.props.user.userName ? (
          <WelcomeScreen start={this.startGame} user={this.props.user} nearKillzone={this.props.nearKillzone} />
        ) : (
          <SigninScreen login={this.props.login} error={this.props.user.error} location={this.props.location} />
        )}
      </View>
    );
  }

  startGame() {
    this.setState({
      playing: true
    });
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
    marginBottom: 5
  },
  crosshair: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2 - 2,
    left: Dimensions.get('window').width / 2 - 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    borderWidth: 1,
    backgroundColor: 'red'
  }
});

const mapStateToProps = state => {
  return {
    user: state.user,
    location: state.location,
    nearKillzone: !!state.location.radius
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login(email, password) {
      dispatch(loginThunk(email, password));
    },
    getActiveLocation(location) {
      dispatch(getActiveLocationThunk(location));
    },
  };
};

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(DcApp);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
