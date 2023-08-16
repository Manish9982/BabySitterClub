import { FlatList, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Searchbar, Text } from 'react-native-paper'
import BabySitterCard from '../components/BabySitterCard';
import Spaces from '../helper/Spaces';
import Colors from '../helper/Colors';
import Fonts from '../helper/Fonts';
import Loader from '../components/Loader';
import { handleGetRequest } from '../helper/Utils';

const SearchBabySitter = ({ navigation }) => {
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)


    const [babySittersData, setBabySittersData] = useState([])
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        getUsers()
    }, [])


    const getUsers = async () => {
        const result = await handleGetRequest('users')
        setBabySittersData(result)
        setLoader(false)
    }


    const handleFavourite = (Id) => {
        // setBabySittersData((prevBabysitters) =>
        //     prevBabysitters?.users?.map((bs) =>
        //         bs.Id === Id ? { ...bs, isFavourite: !bs.isFavourite } : bs
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
                onPressFavourite={() => handleFavourite(item?.Id)}
            />
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
                        placeholder='Search Location'
                        style={styles.searchBar}
                        icon={{ source: "filter-variant", direction: 'rtl' }}
                        onIconPress={onPressFilter}
                    />

                </View>

                {
                    babySittersData?.users?.length == 0
                        ?
                        <Text style={styles.nothingToShow}>No BabySitters Found</Text>
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
        alignSelf:'center',
        marginTop:'70%'
    }
})