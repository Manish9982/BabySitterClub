import { View, Text, Touchable, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'

const CloseButton = ({ onPress, size = 20 }) => {
    return (
        <TouchableOpacity
            style={styles.closeButton}
            onPress={onPress}>
            <AntDesign name='closecircleo' color='red' size={size} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    closeButton:
    {
        alignSelf: 'flex-end'
    }
})

export default CloseButton