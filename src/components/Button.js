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
        // backgroundColor: Colors.buttoncolor,
        // paddingVertical: Spaces.lar,
        // paddingHorizontal: Spaces.xl,
        // borderRadius: 8,
        // width: W * 0.85,
        // alignItems: 'center'
        backgroundColor: "#1e81b0",
        height: 45,
        width: "100%",
        justifyContent: 'center',
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
        width: W * 0.85,
        marginVertical:H*0.04,
        paddingHorizontal: Spaces.xl,
    },
    text:
    {
        textAlign: 'center',
        color: 'white',
        fontFamily: "Poppins-Regular",
    }
})