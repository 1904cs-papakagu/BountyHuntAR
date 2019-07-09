import React from 'react';
import { Dimensions, TouchableOpacity, StyleSheet, Image, View, Text } from 'react-native';

export default props => (
  <View
    style={styles.container}
  >
    <View
      style={styles.rulesContainer}
    >
      <Text style={styles.rules}>
        Objective 1: Get to an active killzone.
        {'\n'}{'\n'}
        Objective 2: Eliminate the target before any other player can to earn cash and 3 points!
      </Text>
      <Image
        source={require('../../Images/Readme/Target.png')}
        style={{ height: 75, width: 75 }}
      />
      <Text style={styles.rules}>
        Cash can be spent on ammunition or upgrades. Extra points are awarded for neutralizing other competing players in the same killzone.
        {'\n'}{'\n'}
        Points are deducted for harming civilians and other bystanders.
        {'\n'}{'\n'}
        Do NOT shoot the target's bodyguards (-1 point).
      </Text>
      <Image
        source={require('../../Images/Readme/Guard.png')}
        style={{ height: 75, width: 75 }}
      />
      <Text style={styles.rules}>
        Do NOT shoot civilians(-3 points).
      </Text>
      <Image
        source={require('../../Images/Readme/Civilian.png')}
        style={{ height: 75, width: 75 }}
      />
    </View>

    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => props.onChange(false)}>
        <Text style={styles.profileButton}>
          {props.signedIn ? 'Back to Profile' : 'Go to Sign in screen'}
        </Text>
      </TouchableOpacity>
    </View>

  </View>
)

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000'
  },
  buttonContainer: {
    height: 100,
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000'
  },
  profileButton: {
    backgroundColor: '#000000',
    borderColor: '#ff0000',
    borderWidth: 1,
    borderRadius: 12,
    color: '#ffffff',
    margin: 20,
    padding: 12,
    textAlign: 'center'
  },
  rules: {
    backgroundColor: '#000000',
    color: '#ffffff',
    margin: 20,
    padding: 12,
    textAlign: 'left'
  },
  rulesContainer: {
    backgroundColor: '#000000',
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 12,
    margin: 20,
    padding: 12,
    alignItems: 'center'
  }
})