import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';

export default class WelcomeScreen extends Component{
  render(){
    return (
      <View>
        <Text>Welcome to BountyHuntAR</Text>
        <Text>AgentID: {this.props.user.name}</Text>
        <Button title="start">Start</Button>
      </View>
    )
  }
}
