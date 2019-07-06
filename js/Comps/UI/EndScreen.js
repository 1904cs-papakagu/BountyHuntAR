import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { resetStatus } from '../../store/';
import { connect } from 'react-redux';


const EndScreen = (props) => (
    <View style={styles.container}>
        <Text style={styles.banner}>
            {props.status === 'won' ?
                <Image
                source={require('../../Images/winner.png')}
                style={styles.logoImg}
                resizeMethod="scale"
              /> :
                ''}
            {props.status === 'lost' ?
                <Image
                source={require('../../Images/loser.png')}
                style={styles.logoImg}
                resizeMethod="scale"
              /> :
                ''}
        </Text>


        <TouchableOpacity
            onPress={() => props.ok()}
        >
        <Text style={styles.button}>Back to profile</Text>
        </TouchableOpacity>
    </View>
)


const mapDispatchToProps = dispatch => {
    return {
        ok() {
            dispatch(resetStatus());
        }
    };
};

export default connect(null, mapDispatchToProps)(EndScreen)


let { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000'
    },
    banner: {
        fontFamily: 'American Typewriter',
        fontSize: 30,
        color: '#f54242'
    },
    button: {
        backgroundColor: 'black',
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 12,
        color: 'white',
        margin: 10,
        padding: 12,
        textAlign: 'center'
      },
    logoImg: {
        width: width,
        resizeMode: 'contain'
      }
});
