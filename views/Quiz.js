import React, { Component } from 'react';

import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Card from '../components/Card';
import Btn from '../components/Btn';

class Quiz extends Component {

    state = {
        currentCard: 0,
        showButtons: false
    }

    onFlipCard = showAnswer => {
        this.setState({
            showButtons: showAnswer
        })
    }

    render() {
        const { cardIds } = this.props
        const { showButtons } = this.state

        return (
            <View style={styles.container}>
                <Card
                    id={cardIds[0]}
                    whenFlip={this.onFlipCard}
                />
                {showButtons && (
                    <View style={styles.buttonsContainer}>
                        <Btn style={[styles.button, styles.correctButton]} >
                            <Text>Acertei</Text>
                        </Btn>
                        <Btn style={[styles.button, styles.wrongButton]} >
                            <Text>Errei</Text>
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
        marginRight: 10
    },
    wrongButton: {
        marginLeft: 10
    }
})

const mapStateToProps = ({ cards }, { navigation }) => {
    const deckName = navigation.state.params.deckName
    const cardIds = Object.keys(cards)
        .filter(cardId => cards[cardId].deckName === deckName)
        .map(card => card._id)

    return {
        cardIds
    }
}

Quiz.route = "Quiz"

export default connect(mapStateToProps)(Quiz)