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

    componentWillReceiveProps(){
        this.setState({
            showAnswer: false
        })
    }

    renderCardData = (text, { style, ...props }) => (

        <TouchableOpacity
            style={[styles.container, style]}
            onPress={this.onFlip}
            {...props}
        >
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )

    render() {

        const { card, ...props } = this.props
        const { showAnswer } = this.state

        return showAnswer 
            ? this.renderCardData(card.answer, props)
            : this.renderCardData(card.question, props)
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