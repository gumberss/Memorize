import React, { Component } from 'react';

import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native'
import Texts from '../utils/Texts';
import TextBox from '../components/TextBox';
import Btn from '../components/Btn';
import { blue } from '../utils/colors';

class CardCreator extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text
                    style={styles.texts}
                >{Texts.ADD_CARD_FRONT_TEXT}</Text>
                <TextBox />
                <Text
                    style={styles.texts}
                >{Texts.ADD_CARD_BACK_TEXT}</Text>
                <TextBox />

                <Btn
                    style={styles.registerButton}
                >
                    <Text>{Texts.ADD_CARD_REGISTER_BUTTON_TEXT}</Text>
                </Btn>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        width: '80%',
        alignSelf: 'center',
        marginTop: 20
    },
    texts: {
        fontSize: 16,
        marginTop: 10
    },
    registerButton: {
        marginTop: 20,
        alignSelf: 'flex-end',
        borderColor: blue,
        width: '100%'
    }
})

// const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch =>

CardCreator.route = 'CardCreator'

export default connect()(CardCreator)
