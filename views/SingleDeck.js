import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, FlatList } from 'react-native'

class SingleDeck extends Component {
    render() {
        return (
            <View>
                <Text>Single Deck</Text>
            </View>
        )
    }
}

// const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(Actions, dispatch);

SingleDeck.route = 'SingleDeck'

export default connect(
    // mapStateToProps,
    // mapDispatchToProps
)(SingleDeck);
