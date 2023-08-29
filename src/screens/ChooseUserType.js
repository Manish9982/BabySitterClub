import { FlatList, ImageBackground, StyleSheet, useWindowDimensions, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../components/Button'
import Colors from '../helper/Colors'
import Spaces from '../helper/Spaces'
import { handleGetRequest, handlePostRequest } from '../helper/Utils'
import Loader from '../components/Loader'
import { useDispatch } from 'react-redux'
import { setUsertype } from '../redux/GlobalSlice'
import Fonts from '../helper/Fonts'

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
        const result = await handleGetRequest('user_types')
        setSubServicesData(result)
        setLoader(false)
    }

    const onPressSubService = (subservice) => {
        dispatch(setUsertype(subservice))
        navigation.navigate('Services')
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
            {
                loader ? (
                    <Loader />
                ) : (


                    <View style={styles.middlecontainer}>

                        <Text style={[styles.text, Fonts.larBold]}>
                            Login As
                        </Text>
                        <FlatList
                            contentContainerStyle={styles.box}
                            data={subServicesData?.user_type}
                            renderItem={renderSubServices}
                            keyExtractor={(item, index) => `${index}`}
                        />
                        <Text style={[styles.textBottom, Fonts.smSemiBold]}>
                            Note:
                            Choose "Care Provider" to offer your services and make a difference.{'\n\n'}
                            Choose "Find Care" to find trusted caregivers who meet your needs.</Text>
                    </View>
                )
            }
        </ImageBackground>
    )
}

export default ChooseUserType

const makeStyles = (H, W) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    imageStyle: {
        opacity: 0.3,
    },
    box: {
        justifyContent: 'center',
        backgroundColor: Colors.grayTransparent,
        padding: Spaces.xl,
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: H * 0.02,
        width: W * 0.9
    },
    middlecontainer: {
        padding: Spaces.xl,
        borderRadius: 10,
    },
    countryText: {
        // color: Colors.white,
    },

    text: {
        width: W * 0.95,
        color: Colors.black,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'

    },
    textBottom: {
        top: H * 0.17
    }
});
