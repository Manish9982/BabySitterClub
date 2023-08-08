import { View, StatusBar, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import { Appbar, Text } from 'react-native-paper'
import Colors from './Colors'
import { useNavigation } from '@react-navigation/native'
import Fonts from './Fonts'


const HeaderToolbar = (props) => {
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)


    const navigation = useNavigation()

    return (
        <>
            <StatusBar backgroundColor={Colors.buttoncolor} />
            <Appbar.Header style={styles.appBar}>
                <Appbar.BackAction color={Colors.white} style={{ backgroundColor: Colors.buttoncolor }}
                    onPress={() => { navigation.goBack() }} />

                <Appbar.Content style={{ alignItems: "center", }}
                    title={<Text style={[styles.text, Fonts.xlSemiBold]}>{props.Title}</Text>} />

            </Appbar.Header>
        </>
    )
}

const makeStyles = (H, W) => StyleSheet.create({
    appBar:
    {
        backgroundColor: Colors.white,

    },
    text: {
        width: W * 0.8, color: "black",
    }

})

export default HeaderToolbar