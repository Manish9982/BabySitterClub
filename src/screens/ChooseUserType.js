import { FlatList, ImageBackground, StyleSheet, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../components/Button'
import Colors from '../helper/Colors'
import Spaces from '../helper/Spaces'
import { handlePostRequest } from '../helper/Utils'
import Loader from '../components/Loader'
import { useDispatch } from 'react-redux'
import { setUsertype } from '../redux/GlobalSlice'

const ChooseUserType = ({ navigation, route }) => {
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)

    const dispatch = useDispatch()

    useEffect(() => {
        getSubServices()
    }, [])

    const [subServicesData, setSubServicesData] = useState(null)
    const [loader, setLoader] = useState(true)

    const getSubServices = async () => {
        var formdata = new FormData()
        formdata.append('service_id', route?.params?.services?.id);
        const result = await handlePostRequest('sub_services', formdata)
        setSubServicesData(result)
        setLoader(false)
    }

    const onPressSubService = (subservice) => {
        dispatch(setUsertype(subservice))
        navigation.navigate('Login')
    }

    const renderSubServices = ({ item }) => {
        return (
            <CustomButton title={item?.name}
                onPressButton={() => onPressSubService(item?.id)}
            />
        )
    }

    return (
        <ImageBackground
            imageStyle={styles.imageStyle}
            source={require('../assets/images/app_bg.webp')}
            style={styles.container}>
            {loader ? (
                <Loader />
            ) : (
                <FlatList
                    contentContainerStyle={styles.box}
                    data={subServicesData?.user_type}
                    renderItem={renderSubServices}
                    keyExtractor={(item, index) => `${index}`}
                />
            )}
        </ImageBackground>
    )
}

export default ChooseUserType

const makeStyles = (H, W) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        opacity: 0.5,
    },
    box: {
        justifyContent: 'center',
        backgroundColor: Colors.grayTransparent,
        padding: Spaces.xl,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: H * 0.3
    },
    countryText: {
        color: Colors.white,
    },
});
