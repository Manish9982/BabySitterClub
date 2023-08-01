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
            profilePicture: 'https://www.pexels.com/photo/mother-carrying-her-baby-boy-755028',
            name: 'Jane Doe',
            description: 'Experienced babysitter with CPR certification.',
            hourlyPrice: 15,
            isFavourite: false,
        },
        {
            id: '2',
            profilePicture: 'https://www.pexels.com/photo/blue-jeans-3036405',
            name: 'MS Dhoni',
            description: 'Experienced babysitter with CPR certification.',
            hourlyPrice: 15,
            isFavourite: false,
        },
        {
            id: '3',
            profilePicture: 'https://www.pexels.com/photo/mother-holding-her-little-baby-17473846',
            name: 'Saurav Ganguly',
            description: 'Experienced babysitter with CPR certification.',
            hourlyPrice: 15,
            isFavourite: false,
        },
        {
            id: '4',
            profilePicture: 'https://www.pexels.com/photo/man-holding-a-child-in-his-arms-17401645',
            name: 'Irfan Pathan',
            description: 'Experienced babysitter with CPR certification.',
            hourlyPrice: 15,
            isFavourite: false,
        },
        {
            id: '5',
            profilePicture: 'https://www.pexels.com/photo/father-looking-at-his-baby-4374504',
            name: 'Vivek Mishra',
            description: 'Experienced babysitter with CPR certification.',
            hourlyPrice: 15,
            isFavourite: false,
        },
        {
            id: '6',
            profilePicture: 'https://www.pexels.com/photo/happy-father-and-son-4586688',
            name: 'Chris Gayle',
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