import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native'
import { gray, white, green, red } from '../utils/colors'
import { connect } from 'react-redux'
import Btn from './Btn';
import Icon from '../utils/Icons';
import Texts from '../utils/Texts';

class Card extends Component {

    state = {
        showAnswer: false,
        showFlipCardMessage: true
    }

    onCorrect = () => {

        const { onCorrect } = this.props

        this.onFlip()

        onCorrect && onCorrect()
    }

    onWrong = () => {

        const { onWrong } = this.props

        this.onFlip()

        onWrong && onWrong()
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
        this.setState(oldState => ({
            showAnswer: !oldState.showAnswer,
            showFlipCardMessage: false
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
        //        this.onFlip()
    }

    render() {

        const { card, style, ...props } = this.props
        const { showAnswer, showFlipCardMessage } = this.state

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

            {showFlipCardMessage && (
                <Text style={{ alignSelf: 'center' }}>
                    {Texts.CLICK_IN_CARD_TO_FLIP}
                </Text>
            )}

            {showAnswer && this.renderButtons()}
        </View>)
    }

    renderButtons = () =>
        (<View style={styles.buttonsContainer}>
            <Btn
                style={[styles.button, styles.correctButton]}
                onPress={this.onCorrect}
            >
                <Icon
                    name="checkmark"
                    size={20}
                    style={styles.icon}
                    color={green}
                />

                <Text>{Texts.GOT_ANSWER_CORRECT}</Text>
            </Btn>
            <Btn
                style={[styles.button, styles.wrongButton]}
                onPress={this.onWrong}
            >
                <Icon
                    name="close"
                    size={20}
                    style={styles.icon}
                    color={red}
                />
                <Text>{Texts.GOT_ANSWER_WRONG}</Text>
            </Btn>
        </View>)
}

const styles = StyleSheet.create({
    icon: {
        marginRight: 20
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