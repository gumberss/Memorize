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
        finishCards: false,
        correctAnswerCount: 0,
        wrongAnswerCont: 0,
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

        this.setNextCard()
    }

    onWrong = () => {

        
        this.setState(oldState => ({
            wrongAnswerCont: ++oldState.wrongAnswerCont
        }))

        this.setNextCard()
    }

    setNextCard = () => {

        const { cardIds, deckName, endQuiz } = this.props
        const { currentCard } = this.state

        if (currentCard + 1 === cardIds.length) {

            endQuiz({
                deckName
            })

            clearLocalNotification()
            setLocalNotification()

            this.setState({
                finishCards: true,
            })
        }

        this.setState(oldState => ({
            currentCard: ++oldState.currentCard,
            showButtons: false
        }))
    }

    again = () => {
        this.setState({
            currentCard: 0,
            showButtons: false,
            finishCards: false,
            correctAnswerCount: 0,
            wrongAnswerCont: 0
        })
    }

    backToDeck = () => {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    renderFinishCards = () => {

        const { correctAnswerCount, wrongAnswerCont } = this.state
        const { cardIds } = this.props

        const correctPercent = (100 * correctAnswerCount) / cardIds.length

        return (
            <View style={styles.endGameContainer}>
                <Text style={[
                    styles.endGameMessage,
                    { color: correctPercent >= 70 ? green : correctPercent >= 50 ? blue : red }
                ]}>
                    {
                        correctPercent >= 70
                            ? Texts.EXCELENT
                            : correctPercent >= 50
                                ? Texts.NOT_BAD
                                : Texts.QUIZ_CAN_BE_BETTER
                    }
                </Text>
                <Text>
                    {Texts.GOT_CORRECT_ANSWER_COUNT}
                    {correctPercent}%
                </Text>
                <Text style={styles.correctAnswers}>
                    {Texts.GOT_CORRECT_ANSWER_COUNT}
                    {correctAnswerCount}
                    {' '}
                    {correctAnswerCount === 1 ? Texts.CARD : Texts.CARDS}
                </Text>
                <Text style={styles.wrongAnswers}>
                    {Texts.GOT_WRONG_ANSWER_COUNT}
                    {wrongAnswerCont}
                    {' '}
                    {wrongAnswerCont === 1 ? Texts.CARD : Texts.CARDS}
                </Text>

                <View style={styles.endGameContainerButtons}>
                    <Btn
                        onPress={this.backToDeck}
                        style={styles.backToDeckButton}
                    >
                        <Text>{Texts.BACK_TO_DECK}</Text>
                    </Btn>

                    <Btn
                        onPress={this.again}
                        style={styles.againButton}
                    >
                        <Text>{Texts.AGAIN}</Text>
                    </Btn>
                </View>

            </View>
        )
    }

    render() {
        const { cardIds } = this.props
        const {
            showButtons,
            currentCard,
            finishCards,
            correctAnswerCount,
            wrongAnswerCont,
            showFlipCardMessage
        } = this.state

        if (finishCards)
            return this.renderFinishCards()

        return (
            <View style={styles.container}>
                <Text style={[
                    styles.statusText,
                    { color: correctAnswerCount >= wrongAnswerCont ? green : red }
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
    endGameContainerButtons: {
        marginTop: 10,
        flexDirection: 'row'
    },
    backToDeckButton: {
        borderColor: blue,
        marginRight: 8,
        paddingLeft: 20,
        paddingRight: 20
    },
    againButton: {
        borderColor: blue,
        marginLeft: 8,
        paddingLeft: 20,
        paddingRight: 20
    },
    endGameMessage: {
        fontSize: 28,
        paddingBottom: 10
    },
    correctAnswers: {
        fontSize: 16,
        color: green
    },
    wrongAnswers: {
        fontSize: 16,
        color: red
    },
    endGameContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
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

 const mapDispatchToProps = dispatch =>({
     endQuiz: quiz => dispatch(finishQuiz(quiz))
 })

Quiz.route = "Quiz"

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)