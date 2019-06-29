import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  Image
} from 'react-native';

export default props => (
    <View style={styles.container}>
      <Text style={styles.bountyhuntar}>Welcome to BountyHuntAR</Text>

      <Image
        source={require('../../Images/cody.png')}
        style={styles.profileImg}
      />

      <Text
        style={styles.userInfoText}>
          AgentID: {props.user.userName}
      </Text>

      <Button
        title="Start"
        onPress={props.start}
        color="#ffffff"
      />
    </View>
);

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
  profileImg: {
    height: 250,
    width: 250,
    borderRadius: 250 / 2,
    borderWidth: 6,
    borderColor: '#f54242'
  },
  bountyhuntar: {
    fontFamily: 'American Typewriter',
    fontSize: 25,
    color: '#f54242',
    textAlign: 'center'
  },
  userInfoText: {
    fontFamily: 'American Typewriter',
    fontSize: 17,
    color: '#ffffff',
    textAlign: 'center'
  }
});
