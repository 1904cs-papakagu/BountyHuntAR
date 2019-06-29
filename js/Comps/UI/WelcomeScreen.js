import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';

export default class WelcomeScreen extends Component{
  render(){
    return (
      <View>
        <Text>Welcome to BountyHuntAR</Text>
        <Text>AgentID:</Text>
        <Button title="start">Start</Button>
      </View>
    )
  }
}
