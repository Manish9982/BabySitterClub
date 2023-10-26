import { FlatList, StyleSheet, Alert, useWindowDimensions, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import Spaces from '../helper/Spaces';
import ServicesCard from '../components/ServicesCard';
import CustomButton from '../components/Button';
import Colors from '../helper/Colors';
import { LOCAL_STORE, handleGetRequest, handlePostRequest } from '../helper/Utils';
import Loader from '../components/Loader';
import { setSelectedServices, setUsertype } from '../redux/GlobalSlice'
import { useDispatch, useSelector } from 'react-redux';
import { storeLocalValue } from '../helper/LocalStore';
import { useIsFocused } from '@react-navigation/native';

const SwitchServices = ({ navigation, route }) => {
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)

    //const userType = useSelector(state => state.global.usertype)
    const dispatch = useDispatch()
    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            getServices()
        }
    }, [isFocused])

    const [services, setServices] = useState([]);
    const [loader, setLoader] = useState(true)
    const [baseUrl, setBaseUrl] = useState('')

    const onPressContinue = async () => {
        var formdata = new FormData()
        formdata.append("RoleId", `${route?.params?.user}`);
        for (let i = 0; i < services.length; i++) {
            if (services?.[i]?.isSelected) {
                formdata.append("ServiceId[]", `${services?.[i]?.id}`);
            }
        }
        setLoader(true)
        const result = await handlePostRequest('switch_account', formdata)
        //console.log(result)
        if (result?.status == "200") {
            await storeLocalValue(LOCAL_STORE.TOKEN, result?.token)
            // if (userType == '3') {
            dispatch(setUsertype(`${route?.params?.user}`))
            if (route?.params?.user == '3') {
                navigation.navigate('BottomTabsParent')
            }
            else if (route?.params?.user == '2') {
                navigation.navigate('BottomTabsSitter')

            }
            // }
            // else if (userType == '2') {
            //     dispatch(setUsertype('3'))
            // }
            // storeLocalValue(LOCAL_STORE.TOKEN, result?.token)
            // dispatch(login())
        }
        else {
            Alert.alert('Alert', result?.message)
        }
        setLoader(false)
        // if (services.every(item => !item?.isSelected)) {
        //     null
        // }
        // else {
        //     dispatch(setSelectedServices(services.filter(item => item?.isSelected)));
        //     navigation.navigate('Login')
        // }
        //navigation.goBack()
    }

    const getServices = async () => {
        const result = await handleGetRequest('services')
        setServices(result?.services)
        setBaseUrl(result?.url)
        setLoader(false)
    }

    const onPressService = (item) => {
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
    console.log('service===>', services)
    return (
        loader
            ?
            <Loader />
            :
            <ImageBackground
                imageStyle={styles.imageStyle}
                source={require('../assets/images/background.png')}
                style={styles.container}>
                <FlatList
                    contentContainerStyle={[styles.list]}
                    data={services}
                    renderItem={renderServices}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={services?.length > 3 ? 2 : 1} // Set the number of columns here, you can adjust as needed
                />
                <CustomButton
                    style={styles.button}
                    btnColor={services.every(service => !service.isSelected) ? Colors.gray : Colors.buttoncolor}
                    onPressButton={onPressContinue}
                    title={'Continue'} />
            </ImageBackground>
    );
};


export default SwitchServices

const makeStyles = (H, W) => StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBar:
    {
        margin: Spaces.sm
    },
    imageStyle: {
        opacity: 0.5
    },
    list: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button:
    {
       
    }
})