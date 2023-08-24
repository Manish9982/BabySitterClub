import { View, Text, Touchable, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'

const CloseButton = ({ onPress }) => {
    return (
        <TouchableOpacity
            style={styles.closeButton}
            onPress={onPress}>
            <AntDesign name='closecircleo' color='red' size={20} />
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