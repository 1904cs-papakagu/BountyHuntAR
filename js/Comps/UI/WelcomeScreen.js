import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import KillZone from './KillZone';

export default class WelcomePage extends React.Component {
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
        {/* <Text style={styles.enterKillzone}>
          Mission:{' '}
          {this.props.nearKillzone
            ? 'Enter the Killzone and eliminate the target!'
            : 'Get to the Killzone!'}
        </Text>

        <Button
          title={
            this.props.nearKillzone
              ? 'Start'
              : 'You are not inside an active kill zone'
          }
          onPress={
            this.props.nearKillzone
              ? () => this.props.start(this.props.locationId)
              : () => {}
          }
          color={this.props.nearKillzone ? '#008000' : '#ff0000'}
        /> */}
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
    backgroundColor: 'black',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
    padding: 12,
    textAlign: 'center'
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: height / 2,
    width: width,
  },
  profileImg: {
    height: 250,
    width: 250,
    borderRadius: 250 / 2,
    borderWidth: 6,
    borderColor: 'white'
  },
  logoImg: {
    width: width,
    height: 100,
    resizeMode: 'contain'
  },
  bountyhuntar: {
    fontFamily: 'American Typewriter',
    fontSize: 25,
    color: '#f54242',
    textAlign: 'center'
  },
  userInfoText: {
    fontFamily: 'American Typewriter',
    fontSize: 23,
    color: '#ffffff',
    textAlign: 'center'
  },
  enterKillzone: {
    fontFamily: 'American Typewriter',
    fontSize: 20,
    color: '#f54242',
    textAlign: 'center'
  }
});
