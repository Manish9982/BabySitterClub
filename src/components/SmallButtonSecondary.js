import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import Colors from '../helper/Colors'
import Spaces from '../helper/Spaces'

const SmallButtonSecondary = ({ title, onPressSmallButton, style }) => {
    return (
        <TouchableOpacity
            onPress={onPressSmallButton}
            style={[styles.button, style]}>
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
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    title:
    {
        color: Colors.DEEP_GRAY,
        paddingHorizontal: Spaces.sm
    }

})