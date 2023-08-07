import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../helper/Colors'
import { Text } from 'react-native-paper'
import Fonts from '../helper/Fonts'
import Spaces from '../helper/Spaces'

const SmallWhiteButton = ({ title }) => {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

export default SmallWhiteButton

const styles = StyleSheet.create({
    text:
    {
        ...Fonts.medBold,
        color: Colors.white,
    },
    button:
    {
        backgroundColor: Colors.Secondary,
        alignSelf: 'center',
        padding: Spaces.med,
        borderRadius: 8,
    }
})