import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import Icon from '../utils/Icons'
import Texts from '../utils/Texts'
import { blue, green, yellow } from '../utils/colors';
import DeckCreation from './DeckCreation';

class Decks extends Component {


  createNewDeckNavigation = () => {
    const { navigate } = this.props.navigation

    return navigate(DeckCreation.route, {})
  }

  noDecksRegistrered = () => {
    return (
      <View style={styles.center}>
        <Icon name="warning" size={64} color={yellow} />
        <Text>{Texts.DONT_FOUND_DECKS}</Text>
        <TouchableOpacity
          style={styles.createDeckButton}
          onPress={this.createNewDeckNavigation}
        >
          <Text>{Texts.CREATE_A_DECK}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {

    const { decks } = this.props

    if (decks === undefined) {
      return <ActivityIndicator style={{ marginTop: 20 }} />
    }

    if (!decks.length) {
      return this.noDecksRegistrered()
    }

    return (
      <View>

      </View>
    );
  }
}

styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  createDeckButton: {
    padding: 15,
    backgroundColor: green,
    borderRadius: 8,
    marginTop: 8,
  }
})

const mapStateToProps = ({ decks }) => ({
  decks: Object.keys(decks)
})

export default connect(mapStateToProps)(Decks)