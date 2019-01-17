import React, { Component } from 'react';

import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Card from '../components/Card';
import Btn from '../components/Btn';
import { red, green, blue } from '../utils/colors';
import Texts from '../utils/Texts';
import { NavigationActions } from 'react-navigation'
import { finishQuiz } from '../actions/quiz';
import { clearLocalNotification, setLocalNotification } from '../components/notification';

class Quiz extends Component {

    state = {
        currentCard: 0,
        showButtons: false,
        correctAnswerCount: 0,
        wrongAnswerCount: 0,
        showFlipCardMessage: true
    }

    onFlipCard = showAnswer => {
        this.setState({
            showButtons: showAnswer,
            showFlipCardMessage: false
        })
    }

    onCorrect = () => {

        this.setState(oldState => ({
            correctAnswerCount: ++oldState.correctAnswerCount
        }))

        this.setNextCard(true)
    }

    onWrong = () => {

        this.setState(oldState => ({
            wrongAnswerCount: ++oldState.wrongAnswerCount
        }))

        this.setNextCard(false)
    }

    setNextCard = (correctAnswer) => {

        const { cardIds, deckName, endQuiz } = this.props
        const { currentCard, correctAnswerCount, wrongAnswerCount } = this.state

        if (currentCard + 1 === cardIds.length) {

            endQuiz({ deckName })

            clearLocalNotification()
            setLocalNotification()

            const { navigate } = this.props.navigation

            navigate('QuizResult', {
                deckName,
                correctAnswerCount: correctAnswer && correctAnswerCount + 1 || correctAnswerCount,
                wrongAnswerCount: !correctAnswer && wrongAnswerCount + 1 || wrongAnswerCount,
                cardCount: cardIds.length
            })

            this.setState({
                currentCard: 0,
                showButtons: false,
                correctAnswerCount: 0,
                wrongAnswerCount: 0
            })
        } else {

            this.setState(oldState => ({
                currentCard: ++oldState.currentCard,
                showButtons: false
            }))
        }
    }


    backToDeck = () => {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    render() {
        const { cardIds } = this.props
        const {
            showButtons,
            currentCard,
            correctAnswerCount,
            wrongAnswerCount,
            showFlipCardMessage
        } = this.state

        return (
            <View style={styles.container}>
                <Text style={[
                    styles.statusText,
                    { color: correctAnswerCount >= wrongAnswerCount ? green : red }
                ]}>
                    {currentCard + 1} / {cardIds.length}
                </Text>

                <Card
                    id={cardIds[currentCard]}
                    whenFlip={this.onFlipCard}
                    style={styles.card}
                />

                {showFlipCardMessage && (
                    <Text style={{ alignSelf: 'center' }}>
                        {Texts.CLICK_IN_CARD_TO_FLIP}
                    </Text>
                )}
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
    },
    statusText: {
        fontSize: 16,
        paddingBottom: 8
    }
})

const mapStateToProps = ({ cards }, { navigation }) => {
    const deckName = navigation.state.params.deckName
    const cardIds = Object.keys(cards)
        .filter(cardId => cards[cardId].deckName === deckName)

    return {
        cardIds,
        deckName
    }
}

const mapDispatchToProps = dispatch => ({
    endQuiz: quiz => dispatch(finishQuiz(quiz))
})

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)