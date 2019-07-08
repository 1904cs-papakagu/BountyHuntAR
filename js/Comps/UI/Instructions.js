import React from 'react';
import {Dimensions, TouchableOpacity, StyleSheet, Image, View, Text} from 'react-native';

export default props => (
  <View
    style={styles.container}
  >

    <View
      style={styles.rulesContainer}
    >
      <Text style={styles.rules}>
        Players earn points and virtual cash which can be spent on ammunition or upgrades. Points are deducted for harming civilians and other bystanders. Extra points are awarded for neutralizing other competing players in the same killzone.
      </Text>

      <Text style={styles.rules}>
        Eliminate the target before any other player can to earn $$$ and 3 points:
      </Text>

      {/* <Image
        source={require('../../Images/Readme/Target.jpg')}
        style={{height: 50}}
      /> */}

      <Text style={styles.rules}>
        Do not shoot the target's bodyguards (-1 point):
      </Text>

      {/* <Image
        source={require('../../Images/Readme/Guard.jpg')}
        style={{ height: 50 }}
      /> */}

      <Text style={styles.rules}>
        Do not shoot civilians(-3 points):
      </Text>

      {/* <Image
        source={require('../../Images/Readme/Civilian.jpg')}
        style={{ height: 50 }}
      /> */}
    </View>

    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => props.onChange(false)}>
        <Text style={styles.profileButton}>
          {props.signedIn ? 'Profile' : 'Sign in'}
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
  }
})