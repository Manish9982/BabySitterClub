import { View, Text, Touchable, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import Colors from '../helper/Colors'

const CheckButton = ({ onPress, size = 20 }) => {
    return (
        <TouchableOpacity
            style={styles.checkButton}
            onPress={onPress}>
            <AntDesign name='checkcircleo' color={'green'} size={size} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    checkButton:
    {
        alignSelf: 'flex-end'
    }
})

export default CheckButton