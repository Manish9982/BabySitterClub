import { StyleSheet, Text, Touchable, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React from 'react'
import Colors from '../helper/Colors'
import Spaces from '../helper/Spaces'

const CustomButton = ({ onPressButton, title, style }) => {
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)
    return (
        <TouchableOpacity
            style={[styles.button, style]}
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
        alignItems: 'center',
        alignSelf:'center',
        marginVertical:Spaces.med
    },
    text:
    {
        color: Colors.white,
    }
})