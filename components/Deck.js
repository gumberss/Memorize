import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Icon from '../utils/Icons'
import { gray, lowGray, red } from '../utils/colors';
import Texts from '../utils/Texts';
import { deleteDeck } from '../actions/decks';

class Deck extends Component {

    deleteDeck = deckName => {
        const { deleteDeck } = this.props

        deleteDeck(deckName)
    }

    render() {

        const { deck, cardCount, onPress } = this.props

        return (
            <View style={styles.row}>
                <TouchableOpacity style={styles.deckContainer} onPress={onPress} >
                    <View style={styles.deckData}>
                        <Text style={styles.deckName}>{deck.name}</Text>
                        <Text style={styles.deckCardCount}>
                            {`${cardCount} `}
                            {cardCount > 1 ? Texts.CARDS : Texts.CARD}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => this.deleteDeck(deck.name)} >
                    <Icon
                        name="trash"
                        size={24}
                        color={red}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    deleteButton: {
        paddingRight: 20,
        paddingLeft: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    deckContainer: {
        flex: 1
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: lowGray,
        justifyContent: 'space-between'
    },
    deckData: {
        paddingTop: 12,
        paddingBottom: 12,
        alignItems: 'center',
    },
    deckName: {
        fontSize: 16
    },
    deckCardCount: {
        fontSize: 10,
        color: gray
    }
})

const mapStateToProps = ({ decks, cards }, { id }) => {
    return {
        deck: decks[id],
        cardCount: Object.keys(cards)
            .filter(cardId => cards[cardId].deckName === id).length
    }
}

const mapDispatchToProps = dispatch =>({
    deleteDeck: deckName => dispatch(deleteDeck(deckName))
})

export default connect(mapStateToProps, mapDispatchToProps)(Deck)