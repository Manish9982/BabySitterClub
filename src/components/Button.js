import { StyleSheet, Text, Touchable, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React from 'react'
import Colors from '../helper/Colors'
import Spaces from '../helper/Spaces'
import { ActivityIndicator } from 'react-native-paper'

const CustomButton = ({ onPressButton, title, style, btnColor = Colors.buttoncolor, loader }) => {
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)
    return (
        <TouchableOpacity
            disabled={loader}
            style={[styles.button, style, { backgroundColor: btnColor }]}
            onPress={onPressButton}>
            {
                loader ?
                    <ActivityIndicator size={"small"}
                        color={Colors.white}
                    />
                    :
                    <Text style={[styles.text, { color: btnColor == Colors.buttoncolor ? Colors.black : Colors.white,}]}>{title}</Text>
            }

        </TouchableOpacity>
    )
}

export default CustomButton

const makeStyles = (H, W) => StyleSheet.create({
    button:
    {
        height: 50,
        width: "100%",
        justifyContent: 'center',
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
        width: W * 0.85,
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: Spaces.med
    },
    text:
    {
        textAlign: 'center',
        fontFamily: "Poppins-Medium",
        fontSize: 15
    }
})