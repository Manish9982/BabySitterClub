import React, { useState } from 'react';
import { View, Image, StyleSheet, useWindowDimensions, TouchableOpacity, Alert } from 'react-native';
import Spaces from '../helper/Spaces';
import Colors from '../helper/Colors';
import Fonts from '../helper/Fonts';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import { Text } from 'react-native-paper';

const ServiceCard = ({ status, picture, name, isSelected, onPressServices }) => {
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)
    const onPressDisabled = () => {
        Alert.alert('Coming Soon..')
    }
    return (
        <TouchableOpacity
            onPress={status == '1' ? onPressServices : onPressDisabled}
            // style={[styles.container, { backgroundColor: Colors.buttoncolor }]}
            style={[styles.container, { backgroundColor: isSelected ? Colors.selectedcolor : Colors.white }]}>

            <View style={styles.checkBox}>
                <AntDesign name={'checkcircle'} color={Colors.white} size={25} />
            </View>


            <Image
                source={{ uri: picture }}
                // style={[styles.picture]} 

                style={[styles.picture, { tintColor: isSelected ? Colors.white : Colors.black }, { opacity: status == '1' ? 1 : 0.2 }]} />


            <View style={styles.card}>
                {/* <Text style={[styles.name, Fonts.larSemiBold]}>{name}</Text> */}

                <Text style={[styles.name, Fonts.xlSemiBold,
                { color: isSelected ? Colors.white : Colors.black }, { opacity: status == '1' ? 1 : 0.2 }]}>{name}</Text>
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
        borderColor: Colors.gray,
        borderWidth: 0.6,
        alignItems: 'center',
        height: H * 0.24,
        width: W * 0.8,
        borderRadius: 8,
        marginHorizontal: W * 0.05,
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 0.6
    },
    picture:
    {
        width: H * 0.08,
        height: H * 0.08,
        tintColor: Colors.white,
    },
    card:
    {

    },
    name:
    {
        color: Colors.white,
        marginTop: H * 0.015,
    },

    description:
    {
        color: Colors.gray
    },
    checkBox:
    {
        position: 'absolute',
        top: H * 0.02,
        left: W * 0.01,
    }

})