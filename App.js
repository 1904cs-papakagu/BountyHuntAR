import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';

import WelcomeScreen from './js/Comps/UI/WelcomeScreen';
import SigninScreen from './js/Comps/UI/SigninScreen';

import store, { loginThunk, getActiveLocationThunk } from './js/store';

import { ViroARSceneNavigator } from 'react-viro';
import Geolocation from 'react-native-geolocation-service';

import { keyRing } from './secrets.js';

var sharedProps = {
  apiKey: keyRing[Math.floor(Math.random() * 4)]
};

const Game = props => (
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
      playing: false
    };

    this.startGame = this.startGame.bind(this);

    this._updateLocation = this._updateLocation.bind(this);
  }

  componentWillMount() {
    this._updateLocation();
  }

  _updateLocation() {
    if (Platform.OS === 'android') {
      this.props.getActiveLocation([40.7050975, -74.00901303]);
    } else {
      Geolocation.getCurrentPosition(
        position => {
          this.props.getActiveLocation([
            position.coords.latitude,
            position.coords.longitude
          ]);
        },
        error => {
          console.log('ERR0R:', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 25000,
          maximumAge: 3600000
        }
      );
    }
  }

  startGame() {
    this.setState({
      playing: true
    });
  }


  render() {
    if (this.state.playing) {
      return <Game endGame={this.endGame} />;
    }
    return (
      <View style={styles.container}>
        {this.props.user.userName ? (
          <WelcomeScreen
            start={this.startGame}
            user={this.props.user}
            nearKillzone={this.props.nearKillzone}
          />
        ) : (
          <SigninScreen
            login={this.props.login}
            error={this.props.user.error}
            location={this.props.location}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    nearKillzone: state.location.targetLatitude === null ? false : true,
    location: state.location
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login(email, password) {
      dispatch(loginThunk(email, password));
    },
    getActiveLocation(location) {
      dispatch(getActiveLocationThunk(location));
    }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
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
