import { FlatList, StyleSheet, Alert, useWindowDimensions, ImageBackground, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Spaces from '../helper/Spaces';
import ServicesCard from '../components/ServicesCard';
import CustomButton from '../components/Button';
import Colors from '../helper/Colors';
import { handleGetRequest } from '../helper/Utils';
import Loader from '../components/Loader';
import { setSelectedServices } from '../redux/GlobalSlice'
import { useDispatch } from 'react-redux';
import Fonts from '../helper/Fonts';

const Services = ({ navigation }) => {
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)

    const dispatch = useDispatch()

    useEffect(() => {
        getServices()
    }, [])

    const [services, setServices] = useState();
    const [loader, setLoader] = useState(true)
    const [baseUrl, setBaseUrl] = useState('')

    const onPressContinue = () => {
        if (services.every(item => !item?.isSelected)) {
            null
        }
        else {
            dispatch(setSelectedServices(services.filter(item => item?.isSelected)));
            navigation.navigate('Login')
        }

    }

    const getServices = async () => {
        const result = await handleGetRequest('services')
        setServices(result?.services)
        setBaseUrl(result?.url)
        setLoader(false)
    }

    const onPressService = (item) => {
        console.log('item', item)
        const updatedService = services?.map(service => {
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
            picture={`${baseUrl}${item?.picture}`}
            name={item?.service_name}
            onPressServices={() => onPressService(item)}
        />
    );
    return (
        loader
            ?
            <Loader />
            :
            <ImageBackground
                imageStyle={styles.imageStyle}
                source={require('../assets/images/background.png')}
                style={styles.container}>
                <Text style={[styles.textBottom, Fonts.larMedium]}>
                    Select one or more services to suit your needs.</Text>
                <FlatList
                    contentContainerStyle={[styles.list]}
                    data={services}
                    renderItem={renderServices}
                    keyExtractor={(item) => item.id.toString()}
                  //  numColumns={services?.length > 3 ? 2 : 1} // Set the number of columns here, you can adjust as needed
                />
                <CustomButton
                    style={styles.button}
                    btnColor={services.every(service => !service.isSelected) ? Colors.gray : Colors.buttoncolor}
                    onPressButton={onPressContinue}
                    title={'Continue'} />
            </ImageBackground>
    );
};


export default Services

const makeStyles = (H, W) => StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBar:
    {
        margin: Spaces.med
    },
    imageStyle: {
      //  opacity: 0.3
    },
    list: {
        marginTop: H * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button:
    {
       // top: - H * 0.04,
    },
    textBottom: {
        width: W * 0.95,
        marginTop: H * 0.05,
        color: "black",

        textAlign: 'center'

    }
})