import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Dimensions,
  YellowBox,
  Modal
} from 'react-native';

console.ignoredYellowBox = ['Remote debugger'];
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);
import Game from './Game';
import WelcomeScreen from './js/Comps/UI/WelcomeScreen';
import SigninScreen from './js/Comps/UI/SigninScreen';
import EndScreen from './js/Comps/UI/EndScreen';
import Loading from './Loading';
import store, {
  loginThunk,
  startGame,
  resetStatus,
  signUpThunk,
  exitGame,
  setBullets,
  reloading
} from './js/store';


class DcApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.gameStatus) {
      return (
        <View style={styles.container}>
          {this.props.user.userName ? (
            <WelcomeScreen />
          ) : (
            <SigninScreen />
          )}
        </View>
      );
    } else {
      if (this.props.gameStatus === 'playing') {
        return (
          <View style={styles.container}>
            <Modal visible={this.props.loading}>
              <Loading loading={this.props.loading} />
            </Modal>
            <Game />
          </View>
        );
      } else {
        return <EndScreen />;
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    gameStatus: state.game.status,
    loading: state.game.loading
  };
};

const App = connect(
  mapStateToProps,
  null
)(DcApp);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
