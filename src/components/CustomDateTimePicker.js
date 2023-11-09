import { Platform, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { Text } from 'react-native-paper'
import Spaces from '../helper/Spaces'
import Colors from '../helper/Colors'
import { formatDate_mmddyyyy } from '../helper/Utils'

const CustomDateTimePicker = ({ value, onChangeAndroid, onChangeIos, labelAndroid, style, alignSelf = 'center', minimumDate = null }) => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const [showPicker, setShowPicker] = useState(false)

    const onChangeAndroidPick = (a, dt) => {
        setShowPicker(false)
        onChangeAndroid(a, dt)
    }

    const styles = makeStyles(H, W)

    return (
        Platform.OS == 'android'
            ?
            <>
                {
                    showPicker &&
                    <RNDateTimePicker
                        value={value}
                        onChange={(a, date) => onChangeAndroidPick(a, date)}
                        minimumDate={minimumDate}
                    />
                }
                <TouchableOpacity
                    style={[styles.dateContainer, {alignSelf:alignSelf}]}
                    onPress={() => setShowPicker(prev => !prev)}>
                    <Text>
                        {formatDate_mmddyyyy(value, true)}
                    </Text>
                </TouchableOpacity>

            </>

            :
            <RNDateTimePicker
                style={style}
                value={value}
                onChange={onChangeIos}
                minimumDate={minimumDate}
            />
    )
}

export default CustomDateTimePicker

const makeStyles = (H, W) => StyleSheet.create({

    dateContainer:
    {
        alignSelf: 'center',
        padding: Spaces.sm,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        margin: Spaces.sm,
        backgroundColor:Colors.grayTransparent
    }
})