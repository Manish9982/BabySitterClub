import { FlatList, StyleSheet, View, Alert, useWindowDimensions, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import Spaces from '../helper/Spaces';
import FavBabySittersCard from '../components/FavBabySittersCard';
import { handleGetRequest, handlePostRequest } from '../helper/Utils';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../components/Loader';
import { Text } from 'react-native-paper';

const Favourite_Parent = ({ navigation }) => {
    const [babySittersData, setBabySittersData] = useState([])
    const [loader, setLoader] = useState(true)

    const bookingDate = new Date()
    const isFocused = useIsFocused()

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    useEffect(() => {
        if (isFocused) {
            getFavUsers()
        }
    }, [isFocused])

    const styles = makeStyles(H, W)

    const getFavUsers = async () => {
        setLoader(true)
        const result = await handleGetRequest('fav_users')
        if (result?.status == '200') {
            console.log('Fav USers ======>', result)
            setBabySittersData(result)
        } else if (result?.status == '201') {
            setBabySittersData(result)
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

        }
    };

    const handleNavigation = (userid, roleid) => {
        navigation.navigate("ProfileOfSitterDuringBooking_Parent", { 'userID': userid, bookingDate: JSON.stringify(bookingDate) })
    }

    const renderfavBabysitterCard = ({ item }) => (
        <FavBabySittersCard
            rating={item?.rating}
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
            <ImageBackground
                source={require('../assets/images/background.png')}
                style={{ flex: 1 }}>
                {
                    babySittersData?.users?.length == 0
                    &&
                    <Text style={styles.favMessage}>Nothing to show here..</Text>
                }
                <FlatList
                    data={babySittersData?.users}
                    renderItem={renderfavBabysitterCard}
                    keyExtractor={(item) => item.Id}
                />
            </ImageBackground>
    );
};


export default Favourite_Parent

const makeStyles = (H, W) => StyleSheet.create({

    searchBar:
    {
        margin: Spaces.med
    },
    favMessage:
    {
        alignSelf: 'center',
        marginTop: H * 0.4
    },
})