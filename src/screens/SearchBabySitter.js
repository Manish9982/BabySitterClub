
import { Alert, FlatList, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Chip, Searchbar, Text } from 'react-native-paper'
import BabySitterCard from '../components/BabySitterCard';
import Spaces from '../helper/Spaces';
import Colors from '../helper/Colors';
import Fonts from '../helper/Fonts';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';

import { handleGetRequest, handlePostRequest } from '../helper/Utils';

const SearchBabySitter = ({ navigation }) => {
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)

    const [filterdata, setFilterdata] = useState()


    const [babySittersData, setBabySittersData] = useState([])
    const [loader, setLoader] = useState(true)
    const selectedService = useSelector(state => state.global.selectedService)


    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const formdata = new FormData()
        for (let i = 0; i < selectedService.length; i++) {
            formdata.append("ServiceId[]", selectedService?.[i]?.id);
        }
        //formdata.append('serviceIds[]', "2")
        const result = await handlePostRequest('users', formdata)
        console.log("Results==========   ", result)
        setBabySittersData(result)

        if (result?.status == '200') {
        } else if (result?.status == '201') {
            Alert.alert("Alert", result?.message)
        }
        setLoader(false)
    }

    const handleFavourite = (Id) => {
        // setBabySittersData((prevBabysitters) =>
        //     prevBabysitters?.users?.map((bs) =>
        //         bs.Id === Id ? { ...bs, isFavourite: !bs.isFavourite } : bs
        //     )
        // );

    };


    const handleNavigation = (userid) => {
        navigation.navigate("ParentProfile", { 'userID': userid })

    }
    const renderBabysitterCard = ({ item }) => {
        return (
            <BabySitterCard
                profilePicture={`${babySittersData?.url}${item?.profilePicture}`}
                name={item?.name}
                description={item?.description}
                hourlyPrice={item?.hourlyPrice}
                isFavourite={item?.isFavourite}
                onPressFavourite={() => handleFavourite(item?.Id)}
                onPressItemSelected={() =>   handleNavigation(item?.Id)}

            />
        )
    }
    const renderfilters = ({ item }) => {
        return (
            <Chip>{item.service_name}</Chip>
        )
    }

    const onPressFilter = () => {
        navigation.navigate('Filters')
    }

    return (
        loader
            ?
            <Loader />
            :
            <View style={{ flex: 1 }}>
                <View style={styles.upperconatiner}>
                    <Searchbar
                        loading={false}
                        mode='bar'
                        placeholder='Search'
                        style={styles.searchBar}
                     //   icon={{ source: "filter-variant", direction: 'rtl' }}
                      //  onIconPress={onPressFilter}
                    />
                </View>

                {
                    babySittersData?.status == '200' &&
                    <View style={styles.uppercontainer2}>
                        <FlatList
                            horizontal={true}
                            data={babySittersData?.filters}
                            renderItem={renderfilters}
                            keyExtractor={(item) => item.id}
                        />

                    </View>
                }

                {
                    babySittersData?.users?.length == 0
                        ?
                        <Text style={styles.nothingToShow}>No Data Found At This Moment!</Text>
                        :
                        <FlatList
                            data={babySittersData?.users}
                            renderItem={renderBabysitterCard}
                            keyExtractor={(item) => item.Id}
                        />
                }

            </View>
    );
};


export default SearchBabySitter

const makeStyles = (H, W) => StyleSheet.create({

    upperconatiner: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: Spaces.med,
    },
    uppercontainer2: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: Spaces.med,

    },

    searchBar:
    {
        width: W * 0.9,
        height: H * 0.07,
    },
    filterBox:
    {
        borderWidth: 0.6,
        borderColor: Colors.buttoncolor,
        alignSelf: 'flex-end',
        margin: Spaces.sm,
        padding: Spaces.sm,
        borderRadius: 8,
        backgroundColor: Colors.white,
    },
    text:
    {
        ...Fonts.medBold
    },
    nothingToShow:
    {
        alignSelf: 'center',
        marginTop: '70%'
    }
})