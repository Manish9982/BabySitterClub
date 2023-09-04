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
            // style={[styles.container, { backgroundColor: Colors.buttoncolor }]}
            style={[styles.container, { backgroundColor: isSelected ? Colors.selectedcolor : Colors.white }]}>

            <View style={styles.checkBox}>
                <AntDesign name={'checkcircle'} color={Colors.white} size={25} />
            </View>


            <Image
                source={{ uri: picture }}
                // style={[styles.picture]} 

                style={[styles.picture, { tintColor: isSelected ? Colors.white : Colors.black }]} />


            <View style={styles.card}>
                {/* <Text style={[styles.name, Fonts.larSemiBold]}>{name}</Text> */}

                <Text style={[styles.name, Fonts.xlSemiBold, 
                    { color: isSelected ? Colors.white : Colors.black }]}>{name}</Text>
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
        height: W * 0.4,
        width: W * 0.8,
        borderRadius: 8,
        marginHorizontal: W * 0.05,
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 0.6
    },
    picture:
    {
        width: 55,
        height: 55,
        tintColor: Colors.white,
        marginStart:W*0.02

    },
    card:
    {

    },
    name:
    {
        color: Colors.white, 
        marginTop:H*0.015,
        marginStart:W*0.02
    },

    description:
    {
        color: Colors.gray
    },
    checkBox:
    {
        position: 'absolute',
        bottom: W * 0.3,
        left: W * 0.01,
    }

})