import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Dimensions,
} from 'react-native';

export default class SigninScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Bounty Hunt-AR</Text>
        <Text style={styles.welcomeText}>
          {this.props.location ? this.props.location.targetLatitude : 'NO LAT'}
        </Text>
        <Text style={styles.welcomeText}>
          {this.props.location
            ? this.props.location.targetLongitude
            : 'NO LONG'}
        </Text>
        <TextInput
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
          placeholder="E-Mail"
          placeholderTextColor="#ffffff"
          style={this.props.error ? styles.errorField : styles.inputField}
        />
        <TextInput
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
          placeholder="Password"
          placeholderTextColor="#ffffff"
          textContentType="password"
          style={this.props.error ? styles.errorField : styles.inputField}
        />
        {this.props.error ? (
          <Text style={styles.errorMessage}>
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
  errorMessage: {
    fontFamily: 'American Typewriter',
    color: '#f54242',
    textAlign: 'center'
  },
  errorField: {
    color: '#ffffff',
    borderColor: '#f54242',
    borderWidth: 1,
    width: width - 60,
    height: 60
  },
  inputField: {
    color: '#ffffff',
    width: width - 60,
    height: 60
  }
});
