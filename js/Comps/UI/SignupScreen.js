import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';

export default class SignupScreen extends Component{
  render(){
    return (
      <View>
        <Text>Welcome to BountyHuntAR</Text>
        <Button title="signup">Sign Up</Button>
      </View>
    )
  }
}
