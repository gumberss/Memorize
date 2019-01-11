import React from 'react'
import { View, Text } from 'react-native'
import {
    DrawerItems
    , createAppContainer
    , createDrawerNavigator
} from 'react-navigation'

import Decks from '../views/Decks';

const navigator = createDrawerNavigator({
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


export default createAppContainer(navigator)