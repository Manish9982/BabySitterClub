import { FlatList, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Spaces from '../helper/Spaces';
import FavBabySittersCard from '../components/FavBabySittersCard';
import { handleGetRequest, handlePostRequest } from '../helper/Utils';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../components/Loader';

const FavouritesParents = ({ navigation }) => {
    const [babySittersData, setBabySittersData] = useState([])
    const [loader, setLoader] = useState(true)

    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            getFavUsers()
        }

    }, [])


    const getFavUsers = async () => {
        const result = await handleGetRequest('fav_users')
        console.log("Results==========   ", result)
        setBabySittersData(result)
        if (result?.status == '200') {
        } else if (result?.status == '201') {
            Alert.alert("Alert", result?.message)
        }
        setLoader(false)
    }


    const handleFavourite = async (Id) => {
        const formdata = new FormData()
        formdata.append('userId', Id)
        const result = await handlePostRequest('add_fav', formdata)
        if (result?.status == '200') {
            //Alert.alert("Alert", result?.message)
            getFavUsers()
        } else if (result?.status == '201') {
            Alert.alert("Alert", result?.message)
        }
    };



    const renderfavBabysitterCard = ({ item }) => (
        <FavBabySittersCard
            profilePicture={`${babySittersData?.url}${item?.profilePicture}`}
            name={item?.name}
            description={item?.description}
            hourlyPrice={item?.hourlyPrice}
            isFavourite={"1"}
            onPressFavourite={() => handleFavourite(item?.Id)}
            onPressItemSelected={() => handleNavigation(item?.Id)}
        />
    );

    return (
        loader
            ?
            <Loader />
            :
            <View style={{ flex: 1 }}>
                <FlatList
                    data={babySittersData?.users}
                    renderItem={renderfavBabysitterCard}
                    keyExtractor={(item) => item.Id}
                />
            </View>
    );
};


export default FavouritesParents

const styles = StyleSheet.create({

    searchBar:
    {
        margin: Spaces.med
    }
})