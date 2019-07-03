import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  Image
} from 'react-native';
import KillZone from './KillZone';

export default class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      killzone: false
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(bool) {
    this.setState({ killzone: bool });
  }

  render() {
    return !this.state.killzone ? (
      <View style={styles.container}>
        <Text style={styles.bountyhuntar}>Welcome to BountyHuntAR</Text>
        <Image
          source={require('../../Images/cody.png')}
          style={styles.profileImg}
        />
        <Text style={styles.userInfoText}>
          Welcome {this.props.user.userName}
        </Text>
        <Text style={styles.userInfoText}>$$: {this.props.user.cash}</Text>
        <Text style={styles.userInfoText}>Score: {this.props.user.score}</Text>
        <Text style={styles.enterKillzone}>
          Mission:{' '}
          {this.props.nearKillzone
            ? 'Enter the Killzone and eliminate the target!'
            : 'Get to the Killzone!'}
        </Text>
        {/*
      <Button
        title={props.nearKillzone ? 'Start' : 'You are not inside an active kill zone'}
        onPress={props.nearKillzone ? () => props.start(props.locationId) : () => {}}
        color={props.nearKillzone ? '#008000' : '#ff0000'}
      /> */}
        <Button title="KillZone Page" onPress={() => this.onChange(true)} />
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
  profileImg: {
    height: 250,
    width: 250,
    borderRadius: 250 / 2,
    borderWidth: 6,
    borderColor: '#f54242'
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
