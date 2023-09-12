import React, { useState, useEffect } from 'react';
import { View, Text, Image, Alert, FlatList, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import Fonts from '../helper/Fonts';
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';
import { handleGetRequest, handlePostRequest } from '../helper/Utils';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../components/Loader';
import CustomButton from '../components/Button';

const ManageAddress = ({ navigation }) => {
    const [addressdata, setAddressdata] = useState('')
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
        setAddressdata(result)
        console.log(result)
        setLoader(false)
    }

    const onPressAddAdress = () => {
        navigation.navigate('AddAddress')
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
            Alert.alert("Info", result.message)
        }
        setLoader(false)

    }

    const onPressClick = (id) => {

        Alert.alert('Delete Address', "Are you sure, you want to delete this address?", [
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
                <Text style={[styles.savedAddressesTitle, Fonts.larSemiBold]}>Saved Addresses</Text>
                <FlatList
                    data={addressdata?.data}
                    keyExtractor={(item) => item.id}
                    renderItem={renderAddressItem}
                />
                <CustomButton
                    onPressButton={onPressAddAdress}
                    title={'Add new address'}
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
        justifyContent: 'space-between',
    },
    leftIcon: {
        width: 18,
        height: 18,
        tintColor: Colors.LIGHT_BLUE,
    },
    rightIcon: {
        width: 18,
        height: 18,
        tintColor: Colors.LIGHT_BLUE
    },
    rightIconaddresslist: {
        width: 18,
        height: 18,
    },
    buttonText: {
        marginLeft: W * 0.02
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
    },
    addaddressCard: {
        flexDirection: 'row',
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
