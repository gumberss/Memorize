import React from 'react';
import { Ionicons } from '@expo/vector-icons'
import { Platform } from 'react-native'

export default function ({ name, ...props }) {
    return (<Ionicons
        name={
            (Platform === 'ios' ? 'ios-' : 'md-') + name
        }
        {...props}
    />)
}