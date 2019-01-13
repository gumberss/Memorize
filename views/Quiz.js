import React, { Component } from 'react';

import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native'

class Quiz extends Component {

    render() {
        return (
            <View>
                <Text>Quiz</Text> 
            </View>
        )
    }
}

// const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(Actions, dispatch);

Quiz.route = "Quiz"

export default connect(
    // mapStateToProps,
    // mapDispatchToProps
)(Quiz);
