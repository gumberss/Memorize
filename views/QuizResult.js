import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native'
import Btn from '../components/Btn';
import { red, green, blue } from '../utils/colors';
import Texts from '../utils/Texts';
import { NavigationActions } from 'react-navigation'
import Icon from '../utils/Icons';

class QuizResult extends PureComponent {

    backToDeck = () => {
        this.props.navigation.navigate('SingleDeck', {
            deckName: this.props.deckName
        })
    }

    again = () => {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    render() {
        const { cardCount, correctAnswerCount, wrongAnswerCount } = this.props

        const correctPercent = (100 * correctAnswerCount) / cardCount

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
                    {Number(correctPercent).toFixed(2)}%
            </Text>
                <Text style={styles.correctAnswers}>
                    {Texts.GOT_CORRECT_ANSWER_COUNT}
                    {correctAnswerCount}
                    {' '}
                    {correctAnswerCount === 1 ? Texts.CARD : Texts.CARDS}
                </Text>
                <Text style={styles.wrongAnswers}>
                    {Texts.GOT_WRONG_ANSWER_COUNT}
                    {wrongAnswerCount}
                    {' '}
                    {wrongAnswerCount === 1 ? Texts.CARD : Texts.CARDS}
                </Text>

                <View style={styles.endGameContainerButtons}>
                    <Btn
                        onPress={this.backToDeck}
                        style={styles.backToDeckButton}
                    >
                        <Icon
                            name="arrow-round-back"
                            size={20}
                            style={styles.icon}
                            color={blue}
                        />
                        <Text>{Texts.BACK_TO_DECK}</Text>
                    </Btn>

                    <Btn
                        onPress={this.again}
                        style={styles.againButton}
                    >
                        <Icon
                            name="play"
                            size={20}
                            style={styles.icon}
                            color={blue}
                        />
                        <Text>{Texts.AGAIN}</Text>
                    </Btn>
                </View>

            </View>
        )
    }
}



const styles = StyleSheet.create({
    icon: {
        marginRight: 10
    },
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
})

const mapStateToProps = (state, { navigation }) => ({
    ...navigation.state.params
})

export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(QuizResult);
