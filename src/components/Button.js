import { StyleSheet, Text, Touchable, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React from 'react'
import Colors from '../helper/Colors'
import Spaces from '../helper/Spaces'

const CustomButton = ({ onPressButton, title }) => {
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPressButton}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton

const makeStyles = (H, W) => StyleSheet.create({
    button:
    {
        backgroundColor: Colors.blue,
        paddingVertical: Spaces.lar,
        paddingHorizontal: Spaces.xl,
        borderRadius: 8,
        width: W * 0.85,
        alignItems: 'center'
    },
    text:
    {
        color: Colors.white,
    }
})