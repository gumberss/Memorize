import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native'
import { gray, white } from '../utils/colors'
import { connect } from 'react-redux'

class Card extends Component {

    state = {
        showAnswer: false
    }

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);

        this.value = 0;

        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        })

        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })

        this.frontInterpolateText = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })

    }

    onFlip = () => {
        const { whenFlip } = this.props
        const { showAnswer } = this.state

        whenFlip && whenFlip(!showAnswer)

        this.setState(oldState => ({
            showAnswer: !oldState.showAnswer
        }))

        if (this.value >= 90) {
            Animated.spring(this.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10
            }).start();
            
        } else {
            Animated.spring(this.animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10
            }).start();
        }
    }

    componentWillReceiveProps() {
        this.onFlip()
    }

    render() {

        const { card, style, ...props } = this.props
        const { showAnswer } = this.state

        const frontAnimatedStyle = {
            transform: [
                { rotateY: this.frontInterpolate }
            ]
        }

        const frontAnimatedTextStyle = {
            transform: [
                { rotateY: this.frontInterpolateText }
            ]
        }

        return (<View>
            <Animated.View
                style={[frontAnimatedStyle, styles.container, style]}
                onTouchEnd={this.onFlip}
                {...props}
            >
                <Animated.Text style={[styles.text, frontAnimatedTextStyle]}>{showAnswer ? card.answer : card.question}</Animated.Text>
            </Animated.View>
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        borderColor: gray,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height * 0.4,
        backfaceVisibility: 'hidden',
        backgroundColor: 'rgb(64,172,136)'
    },
    cardBack: {
        top: 0,

    },
    text: {
        fontSize: 18
    }
})

const mapStateToProps = ({ cards }, { id }) => ({
    card: cards[id]
});

export default connect(mapStateToProps)(Card)