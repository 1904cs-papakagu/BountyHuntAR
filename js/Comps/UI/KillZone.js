import React from 'react';
import { connect } from 'react-redux';
import { getAllActiveLocationThunk, startGame } from '../../store/';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';


class KillZone extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentCoordinates: [40.7050975, -74.00901303]
    };
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.calculateDisplacement = this.calculateDisplacement.bind(this);
  }

  componentDidMount() {

    this.props.setActiveLocations();
    this.getCurrentLocation();
  }

  getCurrentLocation() {

    if (Platform.OS === 'android') {
      this.setState({
        currentCoordinates: [40.7050975, -74.00901303]
      });
    } else {
      Geolocation.getCurrentPosition(
        position => {
          const currentLatitude = position.coords.latitude;
          const currentLongitude = position.coords.longitude;
          this.setState({
            currentCoordinates: [currentLatitude, currentLongitude]
          });
        },
        error => {
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 25000,
          maximumAge: 3600000
        }
      );
    }
  }

  calculateDisplacement(targetLatitude, targetLongitude) {
    const displacement = [
      (targetLatitude - this.state.currentCoordinates[0]) * 111111,
      0,
      (targetLongitude - this.state.currentCoordinates[1]) *
      111111 *
      Math.cos((Math.PI * targetLatitude) / 180)
    ];

    if (Platform.OS === 'android') {
      displacement[0] = 0;
      displacement[2] = -10;
    }

    const distance = Math.sqrt(displacement[0] ** 2 + displacement[2] ** 2);
    return { distance, displacement }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.locationContainer}>
          <Image
            source={require('../../Images/killzone.png')}
            style={styles.logoImg}
          />
          <Text style={styles.currentCoords}>
            Current Coordinates:{' '}
            {this.state.currentCoordinates[0]},{' '}
            {this.state.currentCoordinates[1]}
          </Text>
          <ScrollView contentContainerStyle={styles.contentContainer}>
          {this.props.locations
            ? this.props.locations.map(location => {
              const { distance, displacement } = this.calculateDisplacement(...location.GPS);
              if (distance < 50) {
                return (
                  <View key={location.id} style={{alignItems: 'center'}}>
                    <Text style={styles.textStyle}>{location.name}: </Text>
                    <TouchableOpacity
                      key={location.id}
                      onPress={() => this.props.start(location.id, this.props.userId, displacement)}
                    >
                      <Text style={styles.acceptButton}>
                        Accept Contract
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              } else {
                return (
                  <View>
                  <Text style={styles.textStyle}>{location.name}: </Text>
                  <TouchableOpacity
                    key={location.id}
                  >
                    <Text style={styles.invalidButton}>
                      {Math.floor(distance)}m away
                    </Text>
                  </TouchableOpacity>
                  </View>
                );
              }
            })
            : <></>
          }
          </ScrollView>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.getCurrentLocation}>
            <Text style={styles.updateButton}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.onChange(false)}>
            <Text style={styles.profileButton}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const mapStateToProps = state => {
  return {
    locations: state.location.locations,
    playing: state.game.playing,
    userId: state.user.id
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setActiveLocations() {
      dispatch(getAllActiveLocationThunk());
    },
    start(locationId, userId, displacement) {
      dispatch(startGame(locationId, userId, displacement));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KillZone);


let { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000'
  },
  contentContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationContainer: {
    height: height / 2,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000'
  },
  buttonContainer: {
    height: 100,
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000'
  },
  updateButton: {
    backgroundColor: '#000000',
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 12,
    color: '#ffffff',
    margin: 20,
    padding: 12,
    textAlign: 'center'
  },
  profileButton: {
    backgroundColor: '#000000',
    borderColor: '#ff0000',
    borderWidth: 1,
    borderRadius: 12,
    color: '#ffffff',
    margin: 20,
    padding: 12,
    textAlign: 'center'
  },
  acceptButton: {
    backgroundColor: '#000000',
    borderColor: '#00ff00',
    borderWidth: 1,
    borderRadius: 12,
    color: '#ffffff',
    margin: 5,
    marginBottom: 25,
    padding: 12,
    textAlign: 'center'
  },
  invalidButton: {
    color: '#ff0000',
    marginBottom: 25,
    textAlign: 'center'
  },
  textStyle: {
    fontFamily: 'American Typewriter',
    fontSize: 18,
    color: '#ffffff'
  },
  currentCoords: {
    fontFamily: 'American Typewriter',
    fontSize: 12,
    color: '#ffffff',
    textDecorationLine: 'underline'
  },
  logoImg: {
    width: width,
    height: 100,
    resizeMode: 'contain'
  }
});
