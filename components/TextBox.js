import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { gray } from '../utils/colors';

export default class TextBox extends Component {
    render() {
        const { style, ...others } = this.props

        return (
            <View style={styles.container}>
                <TextInput
                    style={[styles.textBox, style]}
                    {...others}
                    multiline
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    textBox: {
        display: 'flex',
        maxHeight: 100,
        padding: 4,
    },
    container: {
        marginTop: 5,
        marginBottom: 5,
        borderColor: gray,
        borderWidth: 1,
        borderRadius: 8,
    }
})