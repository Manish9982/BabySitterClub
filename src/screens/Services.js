import { FlatList, StyleSheet, Alert, useWindowDimensions, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { Searchbar, TextInput } from 'react-native-paper'
import BabySitterCard from '../components/BabySitterCard';
import Spaces from '../helper/Spaces';
import FavBabySittersCard from '../components/FavBabySittersCard';
import ServicesCard from '../components/ServicesCard';
import CustomButton from '../components/Button';

const Services = () => {
    const [searchText, setSearchText] = useState('');
    const [babysitters, setBabysitters] = useState([
        {
            id: '1',
            profilePicture: 'https://cdn-icons-png.flaticon.com/128/3282/3282468.png',
            name: 'Child Care',
            description: 'Faridabad',

        },
        {
            id: '2',
            profilePicture: 'https://cdn-icons-png.flaticon.com/128/1076/1076928.png',
            name: 'Pet Care ',
            description: 'Ballabgarh',

        },

        {
            id: '3',
            profilePicture: 'https://cdn-icons-png.flaticon.com/128/1416/1416832.png',
            name: 'Housekeeping ',
            description: 'Ballabgarh',

        },
    ]);

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)


    const onPressContinue = () => {
        Alert.alert("Alert", "Service Selected")
    }

    const renderfavBabysitterCard = ({ item }) => (
        <ServicesCard
            // onPress={onPressCard}

            length={babysitters?.length}
            profilePicture={item.profilePicture}
            name={item.name}
            description={item.description}
            onPressFavourite={() => handleFavourite(item.id)}
        />
    );

    return (
        <ImageBackground
            imageStyle={styles.imageStyle}
            source={require('../assets/images/app_bg.webp')}
            style={{ flex: 1 }}>
            <FlatList
                style={[styles.list, { marginTop: babysitters?.length > 3 ? 0 : H * 0.09 }]}
                data={babysitters}
                renderItem={renderfavBabysitterCard}
                keyExtractor={(item) => item.id.toString()}
                numColumns={babysitters?.length > 3 ? 2 : 1} // Set the number of columns here, you can adjust as needed
                contentContainerStyle={styles.flatListContent}
            />

            <CustomButton
                onPressButton={onPressContinue}
                title={'Continue'} />
        </ImageBackground>
    );
};


export default Services

const makeStyles = (H, W) => StyleSheet.create({

    searchBar:
    {
        margin: Spaces.med
    },
    imageStyle: {
        opacity: 0.5
    },
    list: {


    }
})