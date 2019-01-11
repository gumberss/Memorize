import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { gray } from '../utils/colors'

export default class Card extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Card</Text>
            </View>);
    }
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        marginLeft: 20,
        marginRight:20,
        backgroundColor: gray,
        justifyContent: 'center',
        alignItems: 'center',



    }
})