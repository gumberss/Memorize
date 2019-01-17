import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import TextBox from '../components/TextBox';
import Texts from '../utils/Texts';
import { green, red } from '../utils/colors';
import { addDeck } from '../actions/decks';

class DeckCreation extends Component {

    state = {
        deckName: '',
        subimittedWithoutDeckName: false
    }

    createDeck = () => {
        const { deckName } = this.state
        const { createDeck, deckNames, goBack } = this.props

        if (!deckName) {
            this.setState({
                subimittedWithoutDeckName: true
            })
            return
        }

        !deckNames.includes(deckName)
            && createDeck(deckName)
            && goBack()
    }

    render() {

        const { deckNames } = this.props
        const { deckName, subimittedWithoutDeckName } = this.state

        return (
            <View>
                <Text style={styles.center}>{Texts.LETS_GO_CREATE_DECK}</Text>
                <TextBox
                    onChangeText={deckName => this.setState({ deckName, subimittedWithoutDeckName: false })}
                    value={this.state.deckName}
                    placeholder={Texts.DECK_CREATOR_DECK_NAME}
                />

                <TouchableOpacity
                    style={styles.createDeckButton}
                    onPress={this.createDeck}
                >
                    <Text>{Texts.CREATE_DECK}</Text>
                </TouchableOpacity>

                {deckNames.includes(deckName) && (
                    <Text style={[styles.center, styles.errorMessage]}>{Texts.ALREADY_EXISTS_THIS_DECK_NAME}</Text>
                )}

                {subimittedWithoutDeckName && (
                    <Text style={[styles.center, styles.errorMessage]}>{Texts.FILL_ALL_INPUTS}</Text>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    center: {
        display: 'flex',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    createDeckButton: {
        padding: 15,
        backgroundColor: green,
        borderRadius: 8,
        marginTop: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorMessage: {
        paddingTop: 10,
        color: red
    }
})

const mapStateToProps = ({ decks }) => ({
    deckNames: Object.keys(decks)
})

const mapDispatchToProps = (dispatch, { navigation }) => ({
    createDeck: deckName => dispatch(addDeck(deckName)),
    goBack: () => navigation.goBack()

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeckCreation);

