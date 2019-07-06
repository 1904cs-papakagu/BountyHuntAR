import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView
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
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image
          source={require('../../Images/bountyhuntarlogo.png')}
          style={styles.logoImg}
          resizeMethod="scale"
        />
        <View style={styles.inputFieldContainer}>
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
          <TouchableOpacity
            onPress={() => {
              const { email, password } = this.state;
              this.props.login(email, password);
            }}
          >
            <Text style={styles.button}>Sign In</Text>
          </TouchableOpacity>
          {this.props.error ? (
            <Text style={styles.errorMessage}>
              Invalid E-Mail and/or Password
            </Text>
          ) : (
            <></>
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

let { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: height,
    width: width,
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
  errorMessage: {
    flex: 1,
    justifyContent: 'center',
    color: '#ff0000',
    textAlign: 'center'
  },
  inputFieldContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  errorField: {
    textAlign: 'center',
    color: '#ffffff',
    borderColor: '#ff0000',
    borderWidth: 1,
    borderRadius: 5,
    width: width - 60,
    height: 60,
    margin: 5,
  },
  inputField: {
    textAlign: 'center',
    color: '#ffffff',
    width: width,
    height: 60,
  },
  logoImg: {
    flex: 1,
    width: width,
    resizeMode: 'contain'
  }
});
