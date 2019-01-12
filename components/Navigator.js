import React from 'react'
import { View, Text } from 'react-native'
import {
    DrawerItems,
    createAppContainer,
    createDrawerNavigator,
    createStackNavigator
} from 'react-navigation'

import Decks from '../views/Decks';
import DeckCreation from '../views/DeckCreation';
import SingleDeck from '../views/SingleDeck';

const drawerNavigator = createDrawerNavigator({
    home: {
        screen: Decks
    },
    [DeckCreation.route]: {
        screen: DeckCreation
    }
},
    {
        contentComponent: props => (
            <View>
                <Text>Header</Text>
                <DrawerItems {...props} />
                <Text>Footer</Text>
            </View>
        )
    })

const drawerContainer = createAppContainer(drawerNavigator)

const stackNavigator = createStackNavigator({
    Home: {
      screen: drawerContainer,
      navigationOptions: {
        header: null,
      },
    },
    [SingleDeck.route]: {
        screen: SingleDeck,
        navigationOptions:({ navigation }) =>  ({
            title: `${navigation.state.params.deckName}`
        })
    }
  })

export default createAppContainer(stackNavigator)