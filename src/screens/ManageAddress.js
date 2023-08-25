import React from 'react';
import { View, Text, Image, Button, FlatList, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import Fonts from '../helper/Fonts';
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';

const ManageAddress = ({ navigation }) => {
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)
    const savedAddresses = [
        { id: '1', title: 'Home', address: '123 Main St' },
        { id: '2', title: 'Office', address: '456 Elm St' },
    ];

    const renderAddressItem = ({ item }) => (
        <View style={styles.addressCard}>
            <Text style={[styles.addressTitle, Fonts.larMedium]}>{item.title}</Text>
            <Text style={[styles.addressText, Fonts.medMedium]}>{item.address}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={[styles.addressCard]}>
                <TouchableOpacity

                    onPress={() => {
                        navigation.navigate("AddAddress")
                    }}
                    style={[styles.addButton, Fonts.larSemiBold]}
                >
                    <Image
                        source={require('../assets/images/plus.png')} // Replace with your left icon source
                        style={styles.leftIcon}
                    />
                    <Text style={[styles.buttonText, Fonts.larMedium]}>Add Address</Text>
                    <Image
                        source={require('../assets/images/forwordarrow.png')} // Replace with your right icon source
                        style={styles.rightIcon}
                    />
                </TouchableOpacity>
            </View>
            <Text style={[styles.savedAddressesTitle, Fonts.larSemiBold]}>Saved Addresses</Text>
            <FlatList
                data={savedAddresses}
                keyExtractor={(item) => item.id}
                renderItem={renderAddressItem}
            />
        </View>
    );
};

const makeStyles = (H, W) => StyleSheet.create({
    container: {
        flex: 1,
        padding: Spaces.med,
    },
    addButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        width: W * 0.9
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 0,


    },
    leftIcon: {
        width: 18,
        height: 18,
        marginRight: Spaces.med,
        tintColor:Colors.LIGHT_BLUE

        // backgroundColor:'red'
    },
    rightIcon: {
        width: 18,
        height: 18,
        left: W * 0.35,
        tintColor:Colors.LIGHT_BLUE
    },
    buttonText: {
        color: '#007AFF',
        marginLeft: W * 0.03
    },
    savedAddressesTitle: {
        marginBottom: Spaces.med,
        color: Colors.black,
        marginTop: H * 0.03
    },

    addressCard: {
        padding: Spaces.lar,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: Spaces.sm,
        marginBottom: Spaces.med,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    addressTitle: {
        marginBottom: 4,
        color: Colors.black
    },
    addressText: { color: Colors.gray },
});

export default ManageAddress;
