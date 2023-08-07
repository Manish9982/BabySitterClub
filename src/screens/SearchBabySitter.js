import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Searchbar, TextInput } from 'react-native-paper'
import BabySitterCard from '../components/BabySitterCard';
import Spaces from '../helper/Spaces';

const SearchBabySitter = () => {
    const [searchText, setSearchText] = useState('');
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

    const handleFavourite = (id) => {
        setBabysitters((prevBabysitters) =>
            prevBabysitters.map((bs) =>
                bs.id === id ? { ...bs, isFavourite: !bs.isFavourite } : bs
            )
        );
    };

    const renderBabysitterCard = ({ item }) => (
        <BabySitterCard
            profilePicture={item.profilePicture}
            name={item.name}
            description={item.description}
            hourlyPrice={item.hourlyPrice}
            isFavourite={item.isFavourite}
            onPressFavourite={() => handleFavourite(item.id)}
        />
    );

    return (
        <View style={{ flex: 1 }}>
            <Searchbar
                placeholder='Search Location'
                style={styles.searchBar}
            />
            <FlatList
                data={babysitters}
                renderItem={renderBabysitterCard}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};


export default SearchBabySitter

const styles = StyleSheet.create({

    searchBar:
    {
        margin: Spaces.med
    }
})