import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  YellowBox
} from 'react-native';

console.ignoredYellowBox = ['Remote debugger'];
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);
import Game from './Game';
import WelcomeScreen from './js/Comps/UI/WelcomeScreen';
import SigninScreen from './js/Comps/UI/SigninScreen';
import EndScreen from './js/Comps/UI/EndScreen';


import store, {
  loginThunk,
  getActiveLocationThunk,
  startGame,
  resetStatus
} from './js/store';

import { ViroARSceneNavigator } from 'react-viro';
import Geolocation from 'react-native-geolocation-service';

class DcApp extends Component {
  constructor(props) {
    super(props);
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

  render() {
    if (this.props.gameStatus) {
      if(this.props.gameStatus === 'playing'){
      return <Game />;
      }else{
      return <EndScreen status={this.props.gameStatus} />
      }
    } else {
      return (
        <View style={styles.container}>
          {this.props.user.userName ? (
            <WelcomeScreen
              start={this.props.start}
              user={this.props.user}
              nearKillzone={this.props.nearKillzone}
              locationId={this.props.location.id}
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
}

const mapStateToProps = state => {
  return {
    user: state.user,
    nearKillzone: state.location.targetLatitude === null ? false : true,
    location: state.location,
    gameStatus: state.game.status
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
  }
});
