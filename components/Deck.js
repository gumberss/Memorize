import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'

//number of cards
//count of cards
class Deck extends Component {

    renderDeck = () => {
        return (
            <View>
                <Text>One Deck</Text>
            </View>
        )
    }

    render() {

        const { decks } = this.props

        return (
            <View>
                <FlatList
                    data={decks}
                    renderItem={this.renderDeck}
                />
            </View>
        );
    }
}

const mapStateToProps = ({ decks }, { id }) => {
    return {
        deck: decks[id]
    }
}

export default connect(mapStateToProps)(Deck)
