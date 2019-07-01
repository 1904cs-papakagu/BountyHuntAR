import React from 'react';
import {
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
        title={props.nearKillzone ? 'Start' : 'Not inside an active kill zone'}
        onPress={props.nearKillzone ? props.start : () => {}}
        color={props.nearKillzone ? '#008000' : '#ff0000'}
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
  },
});
