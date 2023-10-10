// Card.js
import React from 'react';
import { View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import Spaces from './Spaces';
import Colors from './Colors';
import Fonts from './Fonts';
import { Text } from 'react-native-paper';

const FavouritesCardView = ({ name, location, imageUri }) => {
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)
    return (
        <View style={styles.container}>

            <View style={styles.card}>
                <Image source={{ uri: imageUri }} style={styles.image} />
                <View style={styles.content}>
                    <Text style={[[styles.name, Fonts.larSemiBold]]}>{name}</Text>
                    <Text style={[styles.location, Fonts.med]}>{location}</Text>
                </View>
            </View>
        </View>
    );
};

const makeStyles = (H, W) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: Spaces.xsm

    },
    card: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: 5,
        padding: Spaces.lar,
        marginBottom: Spaces.med,
        elevation: 5,
    },
    image: {
        width: H * 0.08,
        height: H * 0.08,
        borderRadius: 5
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: Spaces.lar,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },
    location: {
        color: Colors.gray,
    },
});

export default FavouritesCardView;
