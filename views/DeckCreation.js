import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import TextBox from '../components/TextBox';
import Texts from '../utils/Texts';
import { green, red, white } from '../utils/colors';
import { addDeck } from '../actions/decks';
import Icon from '../utils/Icons'
import Btn from '../components/Btn';

class DeckCreation extends Component {

    state = {
        deckName: '',
        subimittedWithoutDeckName: false
    }

    createDeck = () => {
        const { deckName } = this.state
        const { createDeck, deckNames, goToDeck } = this.props

        if (!deckName) {
            this.setState({
                subimittedWithoutDeckName: true
            })
            return
        }

        !deckNames.includes(deckName)
            && createDeck(deckName)
                .then(() => this.resetDeckData())
                .then(() => goToDeck(deckName))
    }

    resetDeckData = () => {
        this.setState({
            deckName: ''
        })

        return true
    }

    render() {

        const { deckNames } = this.props
        const { deckName, subimittedWithoutDeckName } = this.state

        return (
            <View style={styles.container}>
                <Text style={styles.center}>{Texts.LETS_GO_CREATE_DECK}</Text>
                <TextBox
                    onChangeText={deckName => this.setState({ deckName, subimittedWithoutDeckName: false })}
                    value={this.state.deckName}
                    placeholder={Texts.DECK_CREATOR_DECK_NAME}
                />

                <Btn
                    onPress={this.createDeck}
                    style={styles.createDeckButton}
                >
                    <Icon
                        name="add"
                        size={20}
                        style={styles.createIcon}
                        color={green}
                    />
                    <Text>{Texts.CREATE_DECK}</Text>

                </Btn>

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
    createIcon: {
        marginRight: 20
    },
    container: {
        marginTop: 20
    },
    center: {
        display: 'flex',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    createDeckButton: {
        padding: 15,
        borderColor: green,
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
    goToDeck: (deckName) => navigation.navigate('SingleDeck', { deckName })

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeckCreation);

