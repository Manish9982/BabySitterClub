import React, { useState } from 'react';
import { View, Image, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import Spaces from '../helper/Spaces';
import Colors from '../helper/Colors';
import Fonts from '../helper/Fonts';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import { Text } from 'react-native-paper';

const ServiceCard = ({ picture, name, isSelected, onPressServices }) => {
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)
    return (
        <TouchableOpacity
            onPress={onPressServices}
            style={[styles.container, { backgroundColor: Colors.buttoncolor }]}>
            {/* <View style={styles.checkBox}>
                <AntDesign name={'checkcircle'} color={Colors.white} size={25} />
            </View> */}
            <Image
                source={{ uri: picture }}
                style={[styles.picture]} />
            <View style={styles.card}>
                <Text style={[styles.name, Fonts.larSemiBold]}>{name}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ServiceCard;

const makeStyles = (H, W) => StyleSheet.create({
    container:
    {
        padding: Spaces.sm,
        margin: Spaces.sm,
        borderColor: Colors.blue,
        borderWidth: 0.6,
        alignItems: 'center',
        height: W * 0.35,
        width: W * 0.35,
        borderRadius: 8,
        marginHorizontal: W * 0.05,
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        borderWidth: 0.6
    },
    picture:
    {
        width: 40,
        height: 40,
        tintColor: Colors.white
    },
    card:
    {

    },
    name:
    {
        color: Colors.white
    },

    description:
    {
        color: Colors.gray
    },
    checkBox:
    {
        position: 'absolute',
        bottom: W * 0.27,
        left: W * 0.01,
    }

})