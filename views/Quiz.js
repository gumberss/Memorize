import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Card from '../components/Card';
import { red, green, blue } from '../utils/colors';
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
                    style={styles.card}
                    onCorrect={this.onCorrect}
                    onWrong={this.onWrong}
                />
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