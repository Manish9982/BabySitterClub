import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Spaces from '../helper/Spaces';
import FavBabySittersCard from '../components/FavBabySittersCard';

const FavouritesParents = ({ navigation }) => {
    const [babysitters, setBabysitters] = useState([
        {
            id: '1',
            profilePicture: 'https://thumbs.dreamstime.com/b/mother-doughter-14742077.jpg',
            name: 'Alize',
            description: 'Faridabad',

        },
        {
            id: '2',
            profilePicture: 'https://thumbs.dreamstime.com/b/mother-doughter-14742077.jpg',
            name: 'Saniya ',
            description: 'Ballabgarh',

        },

    ]);

    const handleFavourite = (id) => {
        navigation.navigate('ParentProfile', { parentId: id })
    }


    const renderfavBabysitterCard = ({ item }) => (
        <FavBabySittersCard
            profilePicture={item.profilePicture}
            name={item.name}
            description={item.description}
            onPressFavourite={() => handleFavourite(item.id)}
        />
    );

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={babysitters}
                renderItem={renderfavBabysitterCard}
                keyExtractor={(item) => item.id}
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