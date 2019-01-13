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
import CardCreator from '../views/CardCreator';
import Texts from '../utils/Texts';
import Quiz from '../views/Quiz';

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
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.deckName}`
        })
    },
    [CardCreator.route]: {
        screen: CardCreator,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.deckName}`
        })
    },
    [Quiz.route]: {
        screen: Quiz,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.deckName}`
        })
    }
})

export default createAppContainer(stackNavigator)