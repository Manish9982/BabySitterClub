import { FlatList, ImageBackground, StyleSheet, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../components/Button'
import Colors from '../helper/Colors'
import Spaces from '../helper/Spaces'
import { handleGetRequest, handlePostRequest } from '../helper/Utils'
import Loader from '../components/Loader'
import { useDispatch } from 'react-redux'
import { setUsertype } from '../redux/GlobalSlice'

const SwitchUserType = ({ navigation, route }) => {
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
        const result = await handleGetRequest('user_types')
        setSubServicesData(result)
        setLoader(false)
    }

    const onPressSubService = (subservice) => {
        dispatch(setUsertype(subservice))
        navigation.navigate('SwitchServices')
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

export default SwitchUserType

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
