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

import store, { loginThunk, startGame, resetStatus } from './js/store';

class DcApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.gameStatus) {
      if (this.props.gameStatus === 'playing') {
        return <Game crosshairId={this.props.crosshairId} />;
      } else {
        return <EndScreen status={this.props.gameStatus} />;
      }
    } else {
      return (
        <View style={styles.container}>
          {this.props.user.userName ? (
            <WelcomeScreen user={this.props.user} />
          ) : (
            <SigninScreen
              login={this.props.login}
              error={this.props.user.error}
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
    crosshairId: state.user.crosshairId,
    gameStatus: state.game.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login(email, password) {
      dispatch(loginThunk(email, password));
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
