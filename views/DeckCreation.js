import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import TextBox from '../components/TextBox';
import Texts from '../utils/Texts';
import { green } from '../utils/colors';

class DeckCreation extends Component {

    state = {
        text: ''
    }

    createDeck = () => [
    ]

    render() {
        return (
            <View>
                <Text>{Texts.LETS_GO_CREATE_DECK}</Text>
                <TextBox
                    onChangeText={text => this.setState({ text })}
                    value={this.state.text}
                    placeholder={Texts.DECK_CREATOR_DECK_NAME}
                />

                <TouchableOpacity
                    style={styles.createDeckButton}
                    onPress={this.createDeck}
                >
                    <Text>{Texts.CREATE_A_DECK}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    createDeckButton: {
        padding: 15,
        backgroundColor: green,
        borderRadius: 8,
        marginTop: 8,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
// const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(Actions, dispatch);

DeckCreation.route = 'DeckCreation'

export default connect(
    // mapStateToProps,
    // mapDispatchToProps
)(DeckCreation);

