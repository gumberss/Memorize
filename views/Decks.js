import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  AsyncStorage
} from 'react-native'
import Icon from '../utils/Icons'
import Texts from '../utils/Texts'
import { green, yellow } from '../utils/colors';
import DeckCreation from './DeckCreation';
import Deck from '../components/Deck';
import { retrieveStore } from '../actions/store';
import { STORE_DATA_KEY } from '../utils/store';

import { AppLoading } from 'expo'

class Decks extends Component {

  state = {
    loaded: false
  }

  componentDidMount() {

    const { retrieveStore } = this.props

    AsyncStorage.getItem(STORE_DATA_KEY)
      .then(store => JSON.parse(store))
      .then(store => retrieveStore(store))
      .then(() => this.setState({ loaded: true }))

  }

  createNewDeckNavigation = () => {
    const { navigate } = this.props.navigation

    return navigate('DeckCreation', {})
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

  _keyExtractor = deckName => deckName

  renderDeck = ({ item }) => (
    <Deck
      id={item}
      onPress={() => this.openDeck(item)}
    />
  )

  openDeck = deckName => {
    const { navigate } = this.props.navigation

    navigate('SingleDeck', { deckName })
  }

  render() {

    const { decks } = this.props
    const { loaded } = this.state

    if (!loaded)
      return <AppLoading />


    if (decks === undefined) {
      return <ActivityIndicator style={{ marginTop: 20 }} />
    }

    if (!decks.length) {
      return this.noDecksRegistrered()
    }

    return (
      <View>
        <FlatList
          data={decks}
          renderItem={this.renderDeck}
          keyExtractor={this._keyExtractor}
        />
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

const mapDispatchToProps = dispatch => ({
  retrieveStore: store => dispatch(retrieveStore(store))
})

export default connect(mapStateToProps, mapDispatchToProps)(Decks)