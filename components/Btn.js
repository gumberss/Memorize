import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { gray } from '../utils/colors';


export default function Btn({ children, style, ...props }) {
    return (
        <TouchableOpacity style={[styles.button, style]} {...props}>
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: gray,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'

    },
})