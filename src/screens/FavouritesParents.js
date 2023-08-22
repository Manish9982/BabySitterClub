import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Spaces from '../helper/Spaces';
import FavBabySittersCard from '../components/FavBabySittersCard';
import { handleGetRequest } from '../helper/Utils';

const FavouritesParents = ({ navigation }) => {
    const [babySittersData, setBabySittersData] = useState([])

    const [babysitters, setBabysitters] = useState([
        {
            id: '1',
            profilePicture: 'https://thumbs.dreamstime.com/b/mother-doughter-14742077.jpg',
            name: 'Amelia',
            description: 'Dallas',

        },
        {
            id: '2',
            profilePicture: 'https://thumbs.dreamstime.com/b/mother-doughter-14742077.jpg',
            name: 'Ava ',
            description: 'Dallas',

        },
        {
            id: '3',
            profilePicture: 'https://thumbs.dreamstime.com/b/mother-doughter-14742077.jpg',
            name: 'Alice ',
            description: 'Dallas',

        },

    ]);

    
    useEffect(() => {
        getFavUsers()
    }, [])


    const getFavUsers = async () => {
        const result = await handleGetRequest('fav_users')
        console.log("Results==========   ", result)
        setBabySittersData(result)
        if (result?.status == '200') {
        } else if (result?.status == '201') {
            Alert.alert("Alert", result?.message)
        }
      //  setLoader(false)
    }

    const handleFavourite = (id) => {
        navigation.navigate("ParentProfile", { 'userID': id })
    }


    const renderfavBabysitterCard = ({ item }) => (
        <FavBabySittersCard
        profilePicture={`${babySittersData?.url}${item?.profilePicture}`}
        name={item?.name}
        description={item?.description}
        hourlyPrice={item?.hourlyPrice}
        isFavourite={item?.isFavourite}
        onPressFavourite={() => handleFavourite(item?.Id)}
        onPressItemSelected={() => handleNavigation(item?.Id)}
        />
    );

    return (
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