import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';

export default props => (
  <View>
    <Text>Welcome to BountyHuntAR</Text>
    <Text>AgentID: {props.user.userName}</Text>
    <Button title="start" onPress={props.start}>
      Start
    </Button>
  </View>
);
