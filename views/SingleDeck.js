import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import { gray, green, blue } from '../utils/colors'
import Texts from '../utils/Texts'
import Btn from '../components/Btn';

import AwesomeAlert from 'react-native-awesome-alerts'
import Icon from '../utils/Icons';

class SingleDeck extends Component {

    state = {
        showAlert: false
    }

    hideAlert = () => {
        this.setState({
            showAlert: false
        })
    }

    addCard = () => {

        const { navigation, deck } = this.props

        navigation.navigate('CardCreator', { deckName: deck.name })
    }

    startQuiz = () => {

        const { navigation, deck, cardCount } = this.props

        if (!cardCount) {
            this.setState({
                showAlert: true
            })

            return
        }

        navigation.navigate('Quiz', { deckName: deck.name })
    }

    render() {

        const { showAlert } = this.state
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
                        <Icon
                            name="copy"
                            size={20}
                            style={styles.icon}
                            color={blue}
                        />
                        <Text>{Texts.ADD_CARD}</Text>
                    </Btn>

                    <Btn
                        style={styles.startQuizButton}
                        onPress={this.startQuiz}
                    >
                        <Icon
                            name="play"
                            size={20}
                            style={styles.icon}
                            color={green}
                        />
                        <Text>{Texts.START_QUIZ}</Text>
                    </Btn>
                </View>

                <AwesomeAlert
                    show={showAlert}
                    title={Texts.OPS}
                    message={Texts.THERE_IS_NO_CARD_REGISTERED}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={true}
                    showConfirmButton={true}
                    confirmText={Texts.I_UNDERSTAND}
                    confirmButtonColor="#DD6B55"
                    onConfirmPressed={this.hideAlert}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        marginRight: 20
    },
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

const mapStateToProps = ({ decks, cards }, { navigation }) => {

    const { deckName } = navigation.state.params

    return {
        deck: decks[deckName],
        cardCount: Object.keys(cards)
            .filter(cardId => cards[cardId].deckName === deckName).length
    }
}

export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(SingleDeck);
