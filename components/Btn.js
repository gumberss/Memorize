import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { gray } from '../utils/colors';


export default function Btn({ children,  style, ...props }) {
    return (
        <TouchableOpacity style={[styles.button, style]}>
            {children}
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    button: {
        height: 50,
        width: '80%',
        borderWidth: 2,
        borderRadius: 4,
        borderColor: gray,
        display: 'flex',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'

    },
})