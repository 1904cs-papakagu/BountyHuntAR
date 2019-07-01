import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Dimensions,
  Image,
  PermissionsAndroid,
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';

export default class SigninScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      // THE PROPERTIES BELOW ARE ONLY FOR TESTING PURPOSES - DELETE LATER
      lat: null,
      long: null,
      asdf: 'asdf'
    };
    this._updateLocation = this._updateLocation.bind(this);
  }

  componentDidMount() {
    console.log('COMPONENT DID MOUNT!');
    this._updateLocation();
  }

  // THIS BLOCK IS ONLY HERE FOR TESTING PURPOSES - DELETE LATER
  // NOT SURE IF ASYNC IS NECESSARY
  async _updateLocation() {
    console.log('NOW INSIDE _UPDATELOCATION!');
    Geolocation.getCurrentPosition(
      position => {
        let currentLatitude = position.coords.latitude;
        let currentLongitude = position.coords.longitude;
        this.setState({ lat: currentLatitude, long: currentLongitude });
        console.log('POSITION:', position);
      },
      error => { console.log('ERR0R:', error.message) },
      {
        enableHighAccuracy: true,
        timeout: 25000,
        maximumAge: 3600000
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Bounty Hunt-AR</Text>
        <Text style={styles.welcomeText}>{this.state.asdf ? this.state.lat : 'NO LAT'}</Text>
        <Text style={styles.welcomeText}>{this.state.long ? this.state.long : 'NO LONG'}</Text>
        <TextInput
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
          placeholder="E-Mail"
          placeholderTextColor="#ffffff"
          style={
            this.props.error
              ? {
                  color: '#ffffff',
                  borderColor: '#f54242',
                  borderWidth: 1,
                  width: Dimensions.get('window').width - 60,
                  height: 60,

                }
              : {
                  color: '#ffffff',
                  width: Dimensions.get('window').width - 60,
                  height: 60
                }
          }
        />
        <TextInput
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
          placeholder="Password"
          placeholderTextColor="#ffffff"
          textContentType="password"
          style={
            this.props.error
              ? {
                  color: '#ffffff',
                  borderColor: '#f54242',
                  borderWidth: 1,
                  width: Dimensions.get('window').width - 60,
                  height: 60
                }
              : {
                  color: '#ffffff',
                  width: Dimensions.get('window').width - 60,
                  height: 60
                }
          }
        />
        {this.props.error ? (
          <Text
            style={{
              color: '#f54242'
            }}
          >
            Invalid E-Mail and/or Password
          </Text>
        ) : (
          <></>
        )}
        <Button
          onPress={() => {
            const { email, password } = this.state;
            this.props.login(email, password);
          }}
          title="Sign In"
          color="#ffffff"
        />
      </View>
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
  welcomeText: {
    fontFamily: 'American Typewriter',
    fontSize: 50,
    color: '#f54242',
    textAlign: 'center'
  },
});
