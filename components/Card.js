import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { gray, white } from '../utils/colors'
import { connect } from 'react-redux'

class Card extends Component {

    state = {
        showAnswer: false
    }

    onFlip = () => {
        const { whenFlip } = this.props
        const { showAnswer } = this.state

        whenFlip && whenFlip(!showAnswer)

        this.setState(oldState => ({
            showAnswer: !oldState.showAnswer
        }))
    }

    renderCardData = text => (
        <TouchableOpacity
            style={styles.container}
            onPress={this.onFlip}
        >
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )

    render() {

        const { card } = this.props
        const { showAnswer } = this.state

        return showAnswer 
            ? this.renderCardData(card.answer)
            : this.renderCardData(card.question)
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        borderWidth: 2,
        borderColor: gray,
        backgroundColor: white,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height * 0.4
    },
    text: {
        fontSize: 18
    }
})

const mapStateToProps = ({ cards }, { id }) => ({
    card: cards[id]
});

export default connect(mapStateToProps)(Card)