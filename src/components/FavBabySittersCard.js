import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Spaces from '../helper/Spaces';
import Colors from '../helper/Colors';
import Fonts from '../helper/Fonts';

const FavBabySittersCard = ({ profilePicture, name, description,hourlyPrice, onPressFavourite }) => {
    return (
        <TouchableOpacity 
        onPress={onPressFavourite}
        style={styles.container}>
            <Image
                defaultSource={require('../assets/images/mother.png')}
                source={{ uri: profilePicture }}
                style={styles.profilePicture} />
            <View style={styles.card}>
                <Text style={[styles.name, Fonts.larSemiBold]}>{name}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={[styles.price, Fonts.medMedium]}>Hourly Price: ${hourlyPrice}</Text>
            </View>
          
        </TouchableOpacity>
    );
};

export default FavBabySittersCard;

const styles = StyleSheet.create({
    container:
    {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spaces.lar,
        backgroundColor: Colors.white,
        marginTop: Spaces.sm,
        marginHorizontal: Spaces.sm,
        borderColor: Colors.blue,
        borderWidth: 0.6,
        borderRadius: 10
    },
    profilePicture:
    {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: Spaces.med,
        borderWidth:0.6,
    },
    card:
    {
        flex: 1,
    },
    name:
    {

    },
   
    description:
    {
        color: Colors.gray
    },
  
})