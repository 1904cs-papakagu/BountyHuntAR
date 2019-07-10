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

import { loginThunk, signUpThunk } from '../../store'

import {connect} from 'react-redux'

import Instructions from './Instructions';

class SigninScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      renderRules: false,
      signingUp: false,
    };
    this.onChangeRules = this.onChangeRules.bind(this);
  }

  onChangeRules(bool) {
    this.setState({ renderRules: bool });
  }

  render() {
    if (this.state.renderRules) return <Instructions onChange={this.onChangeRules} signedIn={false} />
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
         Props   secureTextEntry={true}
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
            placeholder="Password"
            placeholderTextColor="#ffffff"
            textContentType="password"
            style={this.props.error ? styles.errorField : styles.inputField}
          />

          {this.state.signingUp
          ? <></>
          : <TouchableOpacity
              onPress={() => {
                const { email, password } = this.state;
                this.props.login(email, password);
              }}
            >
              <Text style={styles.button}>Sign In</Text>
            </TouchableOpacity>
          }

          <TouchableOpacity
            onPress={this.state.signingUp
              ? () => {
                const { email, password } = this.state;
                this.props.signUp(email, password);
                this.setState({signingUp: false});
              }
              : () => this.setState({signingUp: true})
            }
          >
            <Text style={styles.button}>Sign Up</Text>
          </TouchableOpacity>
          {this.props.error ? (
            <Text style={styles.errorMessage}>
              Invalid E-Mail and/or Password
            </Text>
          ) : (
            <></>
          )}
        <TouchableOpacity onPress={() => this.onChangeRules(true)}>
          <Text style={styles.briefingButton}>Mission briefing (rules)</Text>
        </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.user.error
  }
}

const mapDispatchToProps = dispatch => {
  return  {
    signUp(email, password){
      dispatch(signUpThunk(email, password))
    },
    login(email, password){
      dispatch(loginThunk(email, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninScreen)

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
  briefingButton: {
    backgroundColor: '#000000',
    borderColor: '#ffffff75',
    borderWidth: 1,
    borderRadius: 12,
    color: '#ff0000',
    margin: 50,
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
    margin: 5
  },
  inputField: {
    textAlign: 'center',
    color: '#ffffff',
    width: width,
    height: 60
  },
  logoImg: {
    flex: 1,
    width: width,
    resizeMode: 'contain'
  }
});
