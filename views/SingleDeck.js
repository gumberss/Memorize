import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { gray } from '../utils/colors';

class SingleDeck extends Component {

    render() {

        const { deck } = this.props

        return (
            <View style={styles.deckContent}>
                <Text style={styles.deckName} >{deck.name}</Text>
                <Text style={styles.deckCardCount} >cards count</Text>
            </View>
        )
    }
}

const mapStateToProps = ({ decks }, { navigation }) => {

    const { deckName } = navigation.state.params

    return {
        deck: decks[deckName]
    }
};

const styles = StyleSheet.create({
    deckContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    deckName: {
        fontSize: 28
    },
    deckCardCount: {
        fontSize: 14,
        color: gray
    }
})

SingleDeck.route = 'SingleDeck'

export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(SingleDeck);
