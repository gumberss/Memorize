import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import TextBox from '../components/TextBox';
import Texts from '../utils/Texts';
import { green } from '../utils/colors';
import { addDeck } from '../actions/decks';


class DeckCreation extends Component {

    state = {
        deckName: ''
    }

    createDeck = () => {
        const { deckName } = this.state
        const { createDeck, deckNames, goBack } = this.props

        !deckNames.includes(deckName)
            && createDeck(deckName)
            && goBack()
    }

    render() {

        const { deckNames } = this.props
        const { deckName } = this.state

        return (
            <View>
                <Text style={styles.center}>{Texts.LETS_GO_CREATE_DECK}</Text>
                <TextBox
                    onChangeText={deckName => this.setState({ deckName })}
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
                    <Text style={styles.center}>{Texts.ALREADY_EXISTS_THIS_DECK_NAME}</Text>
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
    }
})

const mapStateToProps = ({ decks }) => ({
    deckNames: Object.keys(decks)
})

const mapDispatchToProps = (dispatch, { navigation }) => ({
    createDeck: deckName => dispatch(addDeck(deckName)),
    goBack: () => navigation.goBack()

})

DeckCreation.route = 'DeckCreation'

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeckCreation);

