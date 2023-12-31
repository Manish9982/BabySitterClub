import { StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native'
import React from 'react'
import Colors from '../helper/Colors'
import Spaces from '../helper/Spaces'
import Fonts from '../helper/Fonts'
import { ActivityIndicator, Text } from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient'

const CustomButton = ({ onPressButton, title, style, btnColor = Colors.PRIMARY, loader, disabled = null }) => {
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)
    return (
        <TouchableOpacity
            style={[styles.button, style]}
            disabled={disabled || loader}
            onPress={onPressButton}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.linearGradientButton}
                colors={(btnColor == Colors.PRIMARY) && (!disabled) ? [Colors.PRIMARY, Colors.golden] : [Colors.gray, Colors.gray]}>
                {
                    loader ?
                        <ActivityIndicator size={"small"}
                            color={Colors.white}
                        />
                        :
                        <Text style={[styles.text, { color: (btnColor == Colors.PRIMARY || btnColor == Colors.PRIMARY) && (!disabled) ? Colors.black : Colors.white, }]}>{title}</Text>
                }
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default CustomButton

const makeStyles = (H, W) => StyleSheet.create({
    button:
    {

        //justifyContent: 'center',
        //borderRadius: 10,
        //alignSelf: 'center',
        //alignItems: 'center',
        //width: W * 0.85,
        //alignItems: 'center',
        alignSelf: 'center',
        marginVertical: Spaces.sm,
        //borderWidth: 0.6,
    },
    text:
    {
        textAlign: 'center',
        ...Fonts.medBold
    },
    linearGradientButton:
    {
        borderWidth: 0.6,
        height: 50,
        width: W * 0.85,
        borderRadius: 10,
        justifyContent: 'center',
    }
})