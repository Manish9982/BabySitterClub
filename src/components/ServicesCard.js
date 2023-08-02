import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import Spaces from '../helper/Spaces';
import Colors from '../helper/Colors';
import Fonts from '../helper/Fonts';

const ServiceCard = ({ profilePicture, name, length, onPressCard }) => {
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)
    return (
        <View style={[styles.container, {}]}>
            <Image
                defaultSource={require('../assets/images/mother.png')}
                source={{ uri: profilePicture }}
                style={styles.profilePicture} />
            <View style={styles.card}>
                <Text style={[styles.name, Fonts.larSemiBold]}>{name}</Text>
            </View>

        </View>
    );
};

export default ServiceCard;

const makeStyles = (H, W) => StyleSheet.create({
    container:
    {
        padding: Spaces.sm,
        backgroundColor: Colors.white,
        margin: Spaces.sm,
        borderColor: Colors.blue,
        borderWidth: 0.6,
        alignItems: 'center',
        height: W * 0.4,
        width: W * 0.4,
        borderRadius: 8,
        marginHorizontal:W*0.05,
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth:0.6


    },
    profilePicture:
    {
        width: 40,
        height: 40,

    },
    card:
    {

    },
    name:
    {
    },

    description:
    {
        color: Colors.gray
    },

})