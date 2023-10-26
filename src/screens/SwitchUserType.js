import { FlatList, ImageBackground, StyleSheet, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../components/Button'
import Colors from '../helper/Colors'
import Spaces from '../helper/Spaces'
import { handleGetRequest, handlePostRequest } from '../helper/Utils'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { setUsertype } from '../redux/GlobalSlice'
import { Text } from 'react-native-paper'
import Fonts from '../helper/Fonts'

const SwitchUserType = ({ navigation, route }) => {
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)

    const usertype = useSelector(state => state.global.usertype)
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
        //dispatch(setUsertype(subservice))
        navigation.navigate('SwitchServices', { user: subservice })
    }

    const renderSubServices = ({ item }) => {
        return (
            <CustomButton title={item?.name}
                onPressButton={() => onPressSubService(item?.id)}
            />
        )
    }
    console.log(usertype)
    return (
        <ImageBackground
            imageStyle={styles.imageStyle}
            source={require('../assets/images/background.png')}
            style={styles.container}>
            {loader ? (
                <Loader />
            ) : (
                <>
                    {
                        usertype == '2'
                            ?
                            <Text style={styles.text}>You're logged in as a "Care Provider" right now. Choose an option to switch your role/services.</Text>
                            :
                            <Text style={styles.text}>You're logged in as a "Care Seeker" right now. Choose an option to switch your role/services.</Text>
                    }
                    <FlatList
                        contentContainerStyle={styles.box}
                        data={subServicesData?.user_type}
                        renderItem={renderSubServices}
                        keyExtractor={(item, index) => `${index}`}
                    />
                </>

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
        //backgroundColor: Colors.grayTransparent,
        padding: Spaces.lar,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: H * 0.3
    },
    countryText: {
        color: Colors.white,
    },
    text:
    {
        ...Fonts.medSemiBold,
        textAlign: 'center',
        top: H * 0.3,
        margin: Spaces.sm
    }
});
