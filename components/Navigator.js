import React from 'react'
import { Platform } from 'react-native'
import {
    createAppContainer,
    createStackNavigator,
    createBottomTabNavigator,
    createMaterialTopTabNavigator
} from 'react-navigation'

import Decks from '../views/Decks';
import DeckCreation from '../views/DeckCreation';
import SingleDeck from '../views/SingleDeck';
import CardCreator from '../views/CardCreator';
import Quiz from '../views/Quiz';
import Texts from '../utils/Texts';
import QuizResult from '../views/QuizResult';
import { purple, white } from '../utils/colors';

const routeConfigs = {
    home: {
        screen: Decks,
        navigationOptions: {
            tabBarLabel: "Baralhos",
        }
    },
    DeckCreation: {
        screen: DeckCreation,
        navigationOptions: {
            tabBarLabel: "Criar baralho"
        }
    }
}

const tabNavigatorConfig = {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === "ios" ? purple : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === "ios" ? white : purple,
            shadowColor: "rgba(0, 0, 0, 0.24)",
            backgroundColor: 'rgb(64,172,136)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
};


const Tabs =
    Platform.OS === "ios"
        ? createBottomTabNavigator(routeConfigs, tabNavigatorConfig)
        : createMaterialTopTabNavigator(routeConfigs, tabNavigatorConfig);

const tabsContainer = createAppContainer(Tabs)

const stackNavigator = createStackNavigator({
    Home: {
        screen: tabsContainer,
        navigationOptions: {
            header: null,
        },
    },
    SingleDeck: {
        screen: SingleDeck,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.deckName}`
        })
    },
    CardCreator: {
        screen: CardCreator,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.deckName}`
        })
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.deckName}`
        })
    },
    QuizResult: {
        screen: QuizResult,
        navigationOptions: () => ({
            title: Texts.QUIZ_RESULT_TITLE
        })
    }
})

export default createAppContainer(stackNavigator)