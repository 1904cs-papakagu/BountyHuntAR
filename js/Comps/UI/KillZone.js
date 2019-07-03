import React from 'react';
import { connect } from 'react-redux';
import { getAllActiveLocationThunk } from '../../store/';
import { View, Text, StyleSheet, Button } from 'react-native';

import Geolocation from 'react-native-geolocation-service';
class KillZone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCoordinates: [null, null]
    };
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.calculateDisplacement = this.calculateDisplacement.bind(this);
  }
  componentDidMount() {
    this.props.setActiveLocations();
    this.getCurrentLocation();
  }

  getCurrentLocation() {
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
  calculateDisplacement(targetLatitude, targetLongitude) {
    const displacement = [
      (targetLatitude - this.state.currentCoordinates[0]) * 111111,
      (targetLongitude - this.state.currentCoordinates[1]) *
        111111 *
        Math.cos((Math.PI * targetLatitude) / 180)
    ];
    const distance = Math.sqrt(displacement[0] ** 2 + displacement[1] ** 2);
    return distance;
  }
  render() {
    return (
      <View style={styles.container}>
        {<Text style={styles.activeKillzone}>ACTIVE KILLZONES</Text>}
        {
          <Text style={styles.currentCoords}>
            Current Coordinates:
            {this.state.currentCoordinates[0]},{' '}
            {this.state.currentCoordinates[1]}
          </Text>
        }
        {this.props.locations ? (
          this.props.locations.map(location => (
            <Text style={styles.textStyle} key={location.id}>
              Distance:{' '}
              {Math.floor(this.calculateDisplacement(...location.GPS))}m away
            </Text>
          ))
        ) : (
          <Text style={styles.textStyle}>{String(this.props.locations)}</Text>
        )}

        <Button
          onPress={this.getCurrentLocation}
          title="Update"
          color="#f54242"
        />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    locations: state.location.locations
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setActiveLocations() {
      dispatch(getAllActiveLocationThunk());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KillZone);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000'
  },
  activeKillzone: {
    fontFamily: 'American Typewriter',
    fontSize: 30,
    color: '#f54242'
  },
  textStyle: {
    fontFamily: 'American Typewriter',
    fontSize: 25,
    color: '#ffffff'
  },
  currentCoords: {
    fontFamily: 'American Typewriter',
    fontSize: 12,
    color: '#ffffff'
  }
});
