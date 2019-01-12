import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { gray, green, blue } from '../utils/colors'
import Texts from '../utils/Texts'
import Btn from '../components/Btn';

class SingleDeck extends Component {

    addCard = () => {
        //redirect
    }

    startQuiz = () => {
        //redirect
    }

    render() {

        const { deck } = this.props

        return (
            <View style={styles.deckContainer}>
                <View style={styles.deckContent}>
                    <Text style={styles.deckName} >{deck.name}</Text>
                    <Text style={styles.deckCardCount}>cards count</Text>
                </View>
                <Btn 
                    style={styles.addCardButton}
                    onPress={this.addCard}
                >
                    <Text>{Texts.ADD_CARD}</Text>
                </Btn>

                <Btn 
                    style={styles.startQuizButton}
                    onPress={this.startQuiz}
                >
                    <Text>{Texts.START_QUIZ}</Text>
                </Btn>

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
    startQuizButton: {
        marginBottom: 30,
        borderColor: green
    },
    addCardButton: {
        marginBottom: 30,
        borderColor: blue
    },
    deckContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    deckContainer: {
        flex: 1
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
