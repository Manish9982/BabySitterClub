
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

    const [filterdata, setFilterdata] = useState([])
    const [babySittersData, setBabySittersData] = useState([])
    const [loader, setLoader] = useState(true)
    const [users, setUsers] = useState([])
    const [searchText, setSearchText] = useState("")

    const selectedService = useSelector(state => state.global.selectedService)

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const result = await handleGetRequest('users')
        console.log("Results==========   ", result)
        setBabySittersData(result)

        if (result?.status == '200') {
            setBabySittersData(result)
            setUsers(result?.users)
        } else if (result?.status == '201') {
            Alert.alert("Error", result?.message)
        }
        setLoader(false)
    }

    const handleFavourite = async (Id) => {
        const formdata = new FormData()
        formdata.append('userId', Id)
        const result = await handlePostRequest('add_fav', formdata)
        if (result?.status == '200') {
            //Alert.alert("Alert", result?.message)
            getUsers()
        } else if (result?.status == '201') {
            Alert.alert("Alert", result?.message)
        }
    };

    const handleNavigation = (userid, roleid) => {
        navigation.navigate("ProfileOfSitterDuringBooking_Parent", { 'userID': userid })

    }

    const throwChipSelection = (name) => {
        if (filterdata?.includes(name)) {
            return true
        }
    }

    const onPressChip = (name) => {
        if (filterdata?.includes(name)) {
            setFilterdata(prev => prev?.filter(item => item !== name))
        }
        else {
            setFilterdata(prev => [...prev, name])
        }
    }

    function haveCommonElements(arr1, arr2) {
        for (let i = 0; i < arr1?.length; i++) {
            for (let j = 0; j < arr2?.length; j++) {
                if (arr1[i] === arr2[j]) {
                    return true;
                }
            }
        }
        return false;
    }
  
    console.log("filterData=======>", filterdata)
    const renderBabysitterCard = ({ item }) => {
        if ((haveCommonElements(filterdata, item?.service) || filterdata?.length == 0) && (item?.name?.toLowerCase()?.includes(searchText?.toLowerCase()))) {
            return (
                <BabySitterCard
                    profilePicture={`${babySittersData?.url}${item?.profilePicture}`}
                    name={item?.name}
                    description={item?.description}
                    hourlyPrice={item?.hourlyPrice}
                    isFavourite={item?.isFavourite}
                    onPressFavourite={() => handleFavourite(item?.Id)}
                    onPressItemSelected={() => handleNavigation(item?.Id)}

                />
            )
        }

    }
    const renderfilters = ({ item }) => {
        return (
            <Chip
                selectedColor={Colors.blue}
                onPress={() => onPressChip(item.service_name)}
                selected={throwChipSelection(item.service_name)}
            >{item.service_name}</Chip>
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
                        onChangeText={(text) => setSearchText(text)}
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
                            data={users}
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