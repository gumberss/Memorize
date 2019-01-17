import React, { Component } from 'react';
import newId from 'uuid/v1'
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native'
import Texts from '../utils/Texts';
import TextBox from '../components/TextBox';
import Btn from '../components/Btn';
import { blue } from '../utils/colors';
import { registerCard } from '../actions/card';

class CardCreator extends Component {

    state = {
        question: '',
        answer: ''
    }

    onRegisterCard = () => {

        const { answer, question } = this.state
        const { registerCard, navigation } = this.props
        const deckName = navigation.state.params.deckName

        registerCard({
            _id: newId(),
            answer,
            question,
            deckName
        })

        this.setState({
            question: '',
            answer: ''
        })

        this.questionInput && this.questionInput.focus()
    }

    render() {

        const { answer, question } = this.state

        return (
            <View style={styles.container}>
                <Text
                    style={styles.texts}
                >{Texts.ADD_CARD_FRONT_TEXT}</Text>
                <TextBox
                    ref={(input) => this.questionInput = input}
                    onChangeText={question => this.setState({ question })}
                    value={question}
                />
                <Text
                    style={styles.texts}
                >{Texts.ADD_CARD_BACK_TEXT}</Text>
                <TextBox
                    onChangeText={answer => this.setState({ answer })}
                    value={answer}
                />

                <Btn
                    style={styles.registerButton}
                    onPress={this.onRegisterCard}
                >
                    <Text>{Texts.ADD_CARD_REGISTER_BUTTON_TEXT}</Text>
                </Btn>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        alignSelf: 'center',
        width: '80%',
        marginTop: 20
    },
    texts: {
        fontSize: 16,
        marginTop: 10
    },
    registerButton: {
        marginTop: 20,
        alignSelf: 'flex-end',
        borderColor: blue,
        width: '100%'
    }
})


const mapDispatchToProps = dispatch => ({
    registerCard: card => dispatch(registerCard(card))
})

export default connect(undefined, mapDispatchToProps)(CardCreator)
