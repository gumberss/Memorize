import React from 'react'
import { View, Text } from 'react-native'
import {
    DrawerItems,
    createAppContainer,
    createDrawerNavigator,
    createStackNavigator
} from 'react-navigation'

import Decks from '../views/Decks';

const drawerNavigator = createDrawerNavigator({
    home: {
        screen: Decks
    },
    paranaue: {
        screen: Decks
    },
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
    }
  })


export default createAppContainer(stackNavigator)