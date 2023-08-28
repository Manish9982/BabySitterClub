import React, { useState, useEffect } from 'react';
import { View, Text, Image, Alert, FlatList, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import Fonts from '../helper/Fonts';
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';
import { handleGetRequest, handlePostRequest } from '../helper/Utils';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../components/Loader';

const ManageAddress = ({ navigation }) => {
    const [adressdata, setAdressdata] = useState('')
    const [loader, setLoader] = useState(true)
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)

    var isFocused = new useIsFocused()

    useEffect(() => {
        if (isFocused) {
            getAddress()
        }
    }, [])


    const getAddress = async () => {
        const result = await handleGetRequest('address_get')
        setAdressdata(result)
        setLoader(false)
    }

    const deleteAddress = async (id) => {
        var formdata = new FormData()
        formdata.append("address_id", id);
        const result = await handlePostRequest('address_delete', formdata)
        if (result.status == "200") {
            getAddress()
        } else if (result.status == "201") {
            Alert.alert("Error", result.message)
        } else {
            Alert.alert("Alert", result.message)
        }
        setLoader(false)

    }

    const onPressClick = (id) => {

        Alert.alert('Alert', "Are you sure, you want to delete?", [
            {
                text: 'Cancel',
                onPress: () => { },
                style: 'cancel',
            },
            { text: 'OK', onPress: () => deleteAddress(id) },
        ]);
    }

    const renderAddressItem = ({ item }) => (
        <View style={styles.addressCard}>

            <View style={styles.addaddressCard}>
                <Text style={[styles.addressTitle, Fonts.larMedium]}>{item.title}</Text>
                <TouchableOpacity
                    onPress={() => onPressClick(item?.id)}>
                    <Image
                        source={require('../assets/images/delete.png')}
                        style={styles.rightIconaddresslist} />
                </TouchableOpacity>


            </View>
            <Text style={[styles.addressText, Fonts.medMedium]}>{item.address}</Text>

        </View>
    );

    return (
        loader
            ?
            <Loader />
            :
            <View style={styles.container}>
                <View style={[styles.addressCard]}>
                    <TouchableOpacity

                        onPress={() => {
                            navigation.navigate("AddAddress")
                        }}
                        style={[styles.addButton, Fonts.larSemiBold]}
                    >
                        <Image
                            source={require('../assets/images/plus.png')}
                            style={styles.leftIcon}
                        />
                        <Text style={[styles.buttonText, Fonts.larMedium]}>Add Address</Text>
                        
                        <Image
                            source={require('../assets/images/forwordarrow.png')}
                            style={styles.rightIcon}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={[styles.savedAddressesTitle, Fonts.larSemiBold]}>Saved Addresses</Text>
                <FlatList
                    data={adressdata?.data}
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
        tintColor: Colors.LIGHT_BLUE

        // backgroundColor:'red'
    },
    rightIcon: {
        width: 18,
        height: 18,
        left: W * 0.35,
        tintColor: Colors.LIGHT_BLUE
    },
    rightIconaddresslist: {
        width: 18,
        height: 18,
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
    addaddressCard: {
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        justifyContent: 'space-between'
    },
    addressTitle: {
        marginBottom: 4,
        color: Colors.black,
    },
    addressText: {

    },
});

export default ManageAddress;
