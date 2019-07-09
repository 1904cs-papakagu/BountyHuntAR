import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import { resetStatus } from '../../store/';
import { connect } from 'react-redux';

const EndScreen = props => (
  <View style={styles.container}>
    <View style={styles.imageContainer}>
      {props.status === 'won' ? (
        <Image
          source={require('../../Images/winner.png')}
          style={styles.logoImg}
          resizeMethod="scale"
        />
      ) : (
        <></>
      )}
      {props.status === 'lost' ? (
        <Image
          source={require('../../Images/loser.png')}
          style={styles.logoImg}
          resizeMethod="scale"
        />
      ) : (
        <></>
      )}
    </View>
      <TouchableOpacity onPress={() => props.ok()}>
        <Text style={styles.button}>Back to profile</Text>
      </TouchableOpacity>
  </View>
);

const mapStateToProps = state => ({
  status: state.game.status
});

const mapDispatchToProps = dispatch => {
  return {
    ok() {
      dispatch(resetStatus());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EndScreen);

let { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000'
  },
  imageContainer: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000'
  },
  button: {
    backgroundColor: '#000000',
    borderColor: '#ff0000',
    borderWidth: 1,
    borderRadius: 12,
    color: '#ffffff',
    margin: 10,
    padding: 12,
    textAlign: 'center'
  },
  logoImg: {
    width: width,
    resizeMode: 'contain'
  }
});
