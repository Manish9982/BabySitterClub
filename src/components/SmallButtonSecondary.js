import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ActivityIndicator, Text } from 'react-native-paper'
import Colors from '../helper/Colors'
import Spaces from '../helper/Spaces'
import Fonts from '../helper/Fonts'

const SmallButtonSecondary = ({ title, onPressSmallButton, style, loader = false }) => {
    return (
        <TouchableOpacity
            onPress={onPressSmallButton}
            style={[styles.button, style]}>
            {
                loader
                    ?
                    <ActivityIndicator color={Colors.white} />
                    :
                    <Text style={styles.title}>{title}</Text>
            }
        </TouchableOpacity>
    )
}

export default SmallButtonSecondary

const styles = StyleSheet.create({
    button:
    {
        backgroundColor: Colors.selectedcolor,
        //paddingVertical: Spaces.sm,
        borderRadius: 8,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    title:
    {
        ...Fonts.sm,
        color: Colors.DEEP_GRAY,
        padding: Spaces.sm
    }

})