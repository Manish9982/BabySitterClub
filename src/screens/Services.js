import { FlatList, StyleSheet, Alert, useWindowDimensions, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import Spaces from '../helper/Spaces';
import ServicesCard from '../components/ServicesCard';
import CustomButton from '../components/Button';

const Services = ({ navigation }) => {
    const [services, setServices] = useState([
        {
            id: '1',
            picture: 'https://cdn-icons-png.flaticon.com/128/3282/3282468.png',
            name: 'Child Care',
            isSelected: false
        },
        {
            id: '2',
            picture: 'https://cdn-icons-png.flaticon.com/128/1076/1076928.png',
            name: 'Pet Care ',
            isSelected: false,
        },

        {
            id: '3',
            picture: 'https://cdn-icons-png.flaticon.com/128/1416/1416832.png',
            name: 'Housekeeping ',
            isSelected: false,
        },
    ]);

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)

    const onPressContinue = () => {
        services.map(item => {
            if (item.isSelected == false) {
                null
            }
            else {
                navigation.navigate('ChooseUserType')
            }
        })
    }

    const onPressService = (item) => {
        console.log('item', item)
        const updatedService = services.map(service => {
            if (service.id == item.id) {
                const newItem = item
                newItem.isSelected = !newItem.isSelected
                return newItem
            }
            return service;
        });
        setServices(updatedService);
    }

    const renderServices = ({ item }) => (
        <ServicesCard
            isSelected={item?.isSelected}
            picture={item?.picture}
            name={item?.name}
            onPressServices={() => onPressService(item)}
        />
    );

    return (
        <ImageBackground
            imageStyle={styles.imageStyle}
            source={require('../assets/images/app_bg.webp')}
            style={{ flex: 1 }}>
            <FlatList
                style={[styles.list, { marginTop: services?.length > 3 ? 0 : H * 0.09 }]}
                data={services}
                renderItem={renderServices}
                keyExtractor={(item) => item.id.toString()}
                numColumns={services?.length > 3 ? 2 : 1} // Set the number of columns here, you can adjust as needed
            />
            <CustomButton
                style={styles.button}
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

    },
    button:
    {
        top: - H * 0.04
    }
})