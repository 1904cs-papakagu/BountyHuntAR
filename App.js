import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import {
  Platform,
  StyleSheet,
  Text,
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
            <WelcomeScreen user={this.props.user} />
          ) : (
            <SigninScreen
              login={this.props.login}
              signUp={this.props.signUp}
              error={this.props.user.error}
            />
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
            <Game
              crosshairId={this.props.crosshairId}
              exitGame={this.props.exitGame}
              bullets={this.props.bullets}
              setBullets={this.props.setBullets}
              reloading={this.props.reloading}
              setReload={this.props.setReload}
            />
          </View>
        );
      } else {
        return <EndScreen status={this.props.gameStatus} />;
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    crosshairId: state.user.crosshairId,
    gameStatus: state.game.status,
    bullets: state.game.bullets,
    reloading: state.game.reloading,
    loading: state.game.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    login(email, password) {
      dispatch(loginThunk(email, password));
    },
    signUp(email, password) {
      dispatch(signUpThunk(email, password));
    },
    exitGame() {
      dispatch(exitGame());
    },
    setBullets(bullets) {
      dispatch(setBullets(bullets));
    },
    setReload(status) {
      dispatch(reloading(status));
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
    flex: 1
  }
});
