import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import KillZone from './KillZone';
import { connect } from 'react-redux';
import { setCrosshair } from '../../store';
class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderKillZone: false
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(bool) {
    this.setState({ renderKillZone: bool });
  }

  render() {
    return !this.state.renderKillZone ? (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../Images/profile.png')}
            style={styles.logoImg}
          />
          <Image
            source={require('../../Images/cody.png')}
            style={styles.profileImg}
          />
        </View>

        <Text style={styles.userInfoText}>
          Welcome {this.props.user.userName}
        </Text>
        <Text style={styles.userInfoText}>$$: {this.props.user.cash}</Text>
        <Text style={styles.userInfoText}>Score: {this.props.user.score}</Text>

        <Text style={styles.userInfoText}>select crosshair</Text>
        <Text
          style={styles.userInfoText}
          onPress={() => this.props.setCrosshair(1)}
        >
          crosshair 1
        </Text>
        <Text
          style={styles.userInfoText}
          onPress={() => this.props.setCrosshair(2)}
        >
          crosshair 2
        </Text>

        <TouchableOpacity
        onPress={() => this.onChange(true)} >
          <Text style={styles.killzoneButton}>Active Killzones</Text>
        </TouchableOpacity>

      </View>
    ) : (
      <KillZone onChange={this.onChange} />
    );
  }
}

let { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: height,
    width: width,
    backgroundColor: '#000000'
  },
  killzoneButton: {
    backgroundColor: '#000000',
    borderColor: '#ff0000',
    borderWidth: 1,
    borderRadius: 12,
    color: '#ffffff',
    padding: 12,
    textAlign: 'center'
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: height / 2,
    width: width
  },
  profileImg: {
    height: 250,
    width: 250,
    borderRadius: 250 / 2,
    borderWidth: 3,
    borderColor: '#ff0000'
  },
  logoImg: {
    width: width,
    height: 100,
    resizeMode: 'contain'
  },
  userInfoText: {
    fontFamily: 'American Typewriter',
    fontSize: 23,
    color: '#ffffff',
    textAlign: 'center'
  },
});

const mapDispatchToProp = dispatch => {
  return {
    setCrosshair: id => dispatch(setCrosshair(id))
  };
};

export default connect(
  null,
  mapDispatchToProp
)(WelcomePage);
