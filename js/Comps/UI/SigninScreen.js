import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
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
      <View>
        <Text>Welcome to BountyHuntAR</Text>
        <TextInput
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
          placeholder="email"
        />
        <TextInput
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
          placeholder="password"
          textContentType="password"
        />
        <Button
          onPress={() => {
            const {email, password} = this.state
            this.props.login(email, password)
          }}
          title="signin"
        >
          Sign In
        </Button>
      </View>
    );
  }
}
