import React from 'react';
import { View, Text, StyleSheet, Button, Platform, Dimensions } from 'react-native';
import { resetStatus } from '../../store/';
import { connect } from 'react-redux';


const EndScreen = (props) => (
    <View style={styles.container}>
        <Text style={styles.banner}>
            {props.status === 'won' ?
                "You Won!" :
                ""}
            {props.status === 'lost' ?
                "You Lost!" :
                ""}
        </Text>
        <Button
            onPress={() => props.ok()}
            title="OK"
            color="#f54242"
        />
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000'
    },
    banner: {
        fontFamily: 'American Typewriter',
        fontSize: 30,
        color: '#f54242'
    },

});
