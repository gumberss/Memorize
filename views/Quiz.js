import React, { Component } from 'react';

import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Card from '../components/Card';
import Btn from '../components/Btn';
import { red, green, blue } from '../utils/colors';
import Texts from '../utils/Texts';

class Quiz extends Component {

    state = {
        currentCard: 0,
        showButtons: false,
        finishCards: false
    }

    onFlipCard = showAnswer => {
        this.setState({
            showButtons: showAnswer
        })
    }

    onCorrect = () => {
        const { cardIds } = this.props
        const { currentCard } = this.state

        this.setNextCard()
    }

    onWrong = () => {

        this.setNextCard()
    }

    setNextCard = () => {

        const { cardIds } = this.props
        const { currentCard } = this.state

        if (currentCard + 1 === cardIds.length) {
            this.setState({
                finishCards: true,
            })
        }
        
        this.setState(oldState => ({
            currentCard: ++oldState.currentCard
        }))
    }

    render() {
        const { cardIds } = this.props
        const { showButtons, currentCard } = this.state
        
        return (
            <View style={styles.container}>
                <Card
                    id={cardIds[currentCard]}
                    whenFlip={this.onFlipCard}
                    style={styles.card}
                />
                {showButtons && (
                    <View style={styles.buttonsContainer}>
                        <Btn
                            style={[styles.button, styles.correctButton]}
                            onPress={this.onCorrect}
                        >
                            <Text>{Texts.GOT_ANSWER_CORRECT}</Text>
                        </Btn>
                        <Btn
                            style={[styles.button, styles.wrongButton]}
                            onPress={this.onWrong}
                        >
                            <Text>{Texts.GOT_ANSWER_WRONG}</Text>
                        </Btn>
                    </View>)
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    button: {
        flex: 1
    },
    correctButton: {
        marginRight: 10,
        borderColor: green
    },
    wrongButton: {
        marginLeft: 10,
        borderColor: red
    },
    card: {
        borderColor: blue
    }
})

const mapStateToProps = ({ cards }, { navigation }) => {
    const deckName = navigation.state.params.deckName
    const cardIds = Object.keys(cards)
        .filter(cardId => cards[cardId].deckName === deckName)

    return {
        cardIds
    }
}

Quiz.route = "Quiz"

export default connect(mapStateToProps)(Quiz)