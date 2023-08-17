import { FlatList, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Chip, Searchbar } from 'react-native-paper'
import BabySitterCard from '../components/BabySitterCard';
import Spaces from '../helper/Spaces';
import Colors from '../helper/Colors';
import Fonts from '../helper/Fonts';
import Loader from '../components/Loader';
import { handleGetRequest, handlePostRequest } from '../helper/Utils';


const SearchBabySitter = ({ navigation }) => {
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)

    const [filterdata, setFilterdata] = useState()


    const [babySittersData, setBabySittersData] = useState([])
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        getUsers()
    }, [])


    const getUsers = async () => {
        const formdata = new FormData()
        formdata.append('serviceIds[]', "1")
        const result = await handlePostRequest('users', formdata)
        setBabySittersData(result)
        setLoader(false)
    }






    const handleFavourite = (id) => {
        // setBabySittersData((prevBabysitters) =>
        //     prevBabysitters?.users?.map((bs) =>
        //         bs.id === id ? { ...bs, isFavourite: !bs.isFavourite } : bs
        //     )
        // );
    };

    const renderBabysitterCard = ({ item }) => {
        return (
            <BabySitterCard
                profilePicture={`${babySittersData?.url}${item?.profilePicture}`}
                name={item?.name}
                description={item?.description}
                hourlyPrice={item?.hourlyPrice}
                isFavourite={item?.isFavourite}
                onPressFavourite={() => handleFavourite(item?.id)}
            />
        )
    }
    const renderfilters = ({ item }) => {
        return (
            <Chip>{item.name}</Chip>
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
                        icon={{ source: "filter-variant", direction: 'rtl' }}
                        onIconPress={onPressFilter}
                    />



                </View>

                <View style={styles.upperconatiner2}>
                    {/* <Chip>All</Chip>
                    <Chip>BabySitter</Chip>
                    <Chip>PetSitter</Chip>
                    <Chip>HomeSitter</Chip> */}

                    <FlatList
                        horizontal={true}
                        data={babySittersData?.filters}
                        renderItem={renderfilters}
                        keyExtractor={(item) => item.id}
                    />

                </View>


                <FlatList
                    data={babySittersData?.users}
                    renderItem={renderBabysitterCard}
                    keyExtractor={(item) => item.id}
                />
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
    upperconatiner2: {
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
    }
})