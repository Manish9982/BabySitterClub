import { FlatList, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Searchbar, TextInput } from 'react-native-paper'
import BabySitterCard from '../components/BabySitterCard';
import Spaces from '../helper/Spaces';
import Colors from '../helper/Colors';
import Fonts from '../helper/Fonts';
import Loader from '../components/Loader';
import { LOCAL_STORE, handleGetRequest } from '../helper/Utils';
import { getLocalValue } from '../helper/LocalStore';
Loader

const SearchBabySitter = ({ navigation }) => {
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)

    const [babysitters, setBabysitters] = useState([
        {
            id: '1',
            profilePicture: require('../assets/images/mother.png'),
            name: 'Jane Doe',
            description: 'Experienced babysitter with CPR certification.',
            hourlyPrice: 14,
            isFavourite: false,
        },
        {
            id: '2',
            profilePicture: require('../assets/images/mother.png'),
            name: 'John Wick',
            description: 'Experienced babysitter with CPR certification.',
            hourlyPrice: 15,
            isFavourite: false,
        },
        {
            id: '3',
            profilePicture: require('../assets/images/mother.png'),
            name: 'Steve Austin',
            description: 'Experienced babysitter with CPR certification.',
            hourlyPrice: 15,
            isFavourite: false,
        },
        {
            id: '4',
            profilePicture: require('../assets/images/mother.png'),
            name: 'John Doe',
            description: 'Experienced babysitter with CPR certification.',
            hourlyPrice: 15,
            isFavourite: false,
        },
        {
            id: '5',
            profilePicture: require('../assets/images/mother.png'),
            name: 'Stuart Broad',
            description: 'Experienced babysitter with CPR certification.',
            hourlyPrice: 15,
            isFavourite: false,
        },
        {
            id: '6',
            profilePicture: require('../assets/images/mother.png'),
            name: 'Chris Jordan',
            description: 'Experienced babysitter with CPR certification.',
            hourlyPrice: 15,
            isFavourite: false,
        },

    ]);

    const [data, setData] = useState([])
    const [loader, setLoader] = useState(true)



    useEffect(() => {
        getUsers()

    }, [])


    const getUsers = async () => {
        const token = await getLocalValue(LOCAL_STORE.TOKEN)
        console.log("token =============== ", token)
        const result = await handleGetRequest('users')
        setData(result)
        setLoader(false)
    }


    const handleFavourite = (id) => {
        setBabysitters((prevBabysitters) =>
            prevBabysitters.map((bs) =>
                bs.id === id ? { ...bs, isFavourite: !bs.isFavourite } : bs
            )
        );
    };

    const renderBabysitterCard = ({ item }) => {
        return (
            <BabySitterCard
                profilePicture={`${data?.url}${item.profilePicture}`}
                name={item.name}
                description={item.description}
                hourlyPrice={item.hourlyPrice}
                isFavourite={item.isFavourite}
                onPressFavourite={() => handleFavourite(item.id)}
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

                <FlatList
                    data={data?.users}
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