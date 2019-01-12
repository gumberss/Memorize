import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Icon from '../utils/Icons'
import { gray, lowGray } from '../utils/colors';

//count of cards
class Deck extends Component {

    render() {

        const { deck, onPress } = this.props

        return (
            <TouchableOpacity onPress={onPress} >
                <View style={styles.row}>
                    <Text style={styles.deckName}>{deck.name}</Text>
                    <Text style={styles.deckCardCount}>cards count</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        paddingTop: 12,
        paddingBottom: 12,
        alignItems: 'center',
        borderBottomColor: lowGray,
        borderBottomWidth: 1
    },
    deckName: {
        fontSize: 16
    },
    deckCardCount: {
        fontSize: 10,
        color: gray
    }
})

const mapStateToProps = ({ decks }, { id }) => {
    return {
        deck: decks[id]
    }
}

export default connect(mapStateToProps)(Deck)