import React, { Component } from 'react';
import { connect } from 'react-redux' 
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import Icon from '../utils/Icons'
import Texts from '../utils/Texts'

class Decks extends Component {

  noDecksRegistrered = () => {
    return (
      <View style={styles.center}>
      <Icon name="warning" size={64} />
        <Text>{Texts.DONT_FOUND_DECKS}</Text>
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
    
  }
})


const mapStateToProps = ({ decks }) => ({
  decks
})

export default connect(mapStateToProps)(Decks)