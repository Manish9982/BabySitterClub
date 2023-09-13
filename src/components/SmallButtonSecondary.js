import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import Colors from '../helper/Colors'
import Spaces from '../helper/Spaces'

const SmallButtonSecondary = ({ title, onPressSmallButton }) => {
    return (
        <TouchableOpacity 
        onPress={onPressSmallButton}
        style={styles.button}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

export default SmallButtonSecondary

const styles = StyleSheet.create({
    button:
    {
        backgroundColor: Colors.selectedcolor,
        paddingVertical: Spaces.vsm,
        borderRadius: 10,
    },
    title:
    {
        color: Colors.white,
        paddingHorizontal: Spaces.sm
    }

})