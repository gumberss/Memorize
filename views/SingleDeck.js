import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { gray, green, blue } from '../utils/colors'
import Texts from '../utils/Texts'
import Btn from '../components/Btn';
import CardCreator from './CardCreator';
import Quiz from './Quiz';

class SingleDeck extends Component {

    addCard = () => {

        const { navigation, deck } = this.props

        navigation.navigate('CardCreator', { deckName: deck.name })
    }

    startQuiz = () => {

        const { navigation, deck } = this.props

        navigation.navigate('Quiz', { deckName: deck.name })
    }

    render() {

        const { deck, cardCount } = this.props

        return (
            <View style={styles.deckContainer}>
                <View style={styles.deckContent}>
                    <Text style={styles.deckName} >{deck.name}</Text>
                    <Text style={styles.deckCardCount}>
                        {`${cardCount} `}
                        {cardCount > 1 ? Texts.CARDS : Texts.CARD}
                    </Text>
                </View>
                <View style={styles.buttonsContainer}>
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

            </View>
        )
    }
}

const mapStateToProps = ({ decks, cards }, { navigation }) => {

    const { deckName } = navigation.state.params

    return {
        deck: decks[deckName],
        cardCount: Object.keys(cards)
            .filter(cardId => cards[cardId].deckName === deckName).length
    }
};

const styles = StyleSheet.create({
    buttonsContainer: {
        width: '80%',
        alignSelf: 'center'
    },
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

export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(SingleDeck);
