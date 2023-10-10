import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'

const AppUpdateMessageScreen = () => {
    return (
        <View style={styles.container
        }>
            <Text style={styles.warnText}>New update is available. Kindly update the app to continue.</Text>
        </View>
    )
}

export default AppUpdateMessageScreen

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    warnText:
    {
        textAlign: 'center'
    }
})