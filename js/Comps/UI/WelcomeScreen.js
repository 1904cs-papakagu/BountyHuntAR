import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Picker,
  ScrollView
} from 'react-native';
import KillZone from './KillZone';
import Instructions from './Instructions';
import { connect } from 'react-redux';
import { setCrosshair } from '../../store';
import { crosshairs } from '../AR/Crosshair';

class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderKillZone: false,
      renderRules: false,
      crosshairs: crosshairs.map((crosshair, index) => index),
    };
    this.onChangeKZ = this.onChangeKZ.bind(this);
    this.onChangeRules = this.onChangeRules.bind(this);
  }

  onChangeKZ(bool) {
    this.setState({ renderKillZone: bool });
  }

  onChangeRules(bool) {
    this.setState({ renderRules: bool });
  }

  render() {
    if (this.state.renderKillZone)
      return <KillZone onChange={this.onChangeKZ} />;
    if (this.state.renderRules)
      return <Instructions onChange={this.onChangeRules} signedIn={true} />;
    return (
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

        <Text style={styles.userInfoText}>Select crosshair:</Text>
        <View style={styles.crosshairContainer}>
          <ScrollView horizontal={true}>
            {this.state.crosshairs.map((crosshair,index) => (
              <TouchableOpacity
               key={index}
                style={
                  this.props.crosshairId !== crosshair
                    ? styles.crosshairButtonUnselected
                    : styles.crosshairButtonSelected
                }
                onPress={() => this.props.setCrosshair(crosshair)}
              >
                <Text style={styles.userInfoText}>#{crosshair + 1}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity onPress={() => this.onChangeKZ(true)}>
          <Text style={styles.killzoneButton}>See Active Killzones</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onChangeRules(true)}>
          <Text style={styles.killzoneButton}>Mission briefing (rules)</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    crosshairId: state.user.crosshairId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setCrosshair: id => dispatch(setCrosshair(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomePage);

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
  crosshairContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  crosshairButtonUnselected: {
    backgroundColor: '#000000',
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 12,
    color: '#ffffff',
    margin: 20,
    padding: 12,
    textAlign: 'center'
  },
  crosshairButtonSelected: {
    backgroundColor: '#000000',
    borderColor: '#00ff00',
    borderWidth: 1,
    borderRadius: 12,
    color: '#ffffff',
    margin: 20,
    padding: 12,
    textAlign: 'center'
  }
});
