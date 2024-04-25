import { Platform, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React from 'react'
import Colors from '../helper/Colors'
import Spaces from '../helper/Spaces'
import { useDispatch, useSelector } from 'react-redux'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import { setDefaultAdressModalVisible } from '../redux/GlobalSlice'
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Fonts from '../helper/Fonts'


const CustomHeaderForChat = ({ title, onPressLeft }) => {
    const defaultAddress = useSelector((state) => state.global.defaultAddress)
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)

    const onPressLocation = () => {
        dispatch(setDefaultAdressModalVisible(true))
    }
    const onPressBack = () =>
    {
        navigation.navigate(onPressLeft)
    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
                {
                    Platform.OS == "ios"
                        ?
                        <MaterialIcons name="arrow-back-ios" size={Spaces.xxl} onPress={onPressBack} color={"#007AFF"} />
                        :
                        <Ionicons name="arrow-back" size={Spaces.xxl} onPress={onPressBack} />
                }
            </View>
            <View style={{ flex: 1.5, alignItems: 'center' }}>
                <Text style={styles.titleText}>{title}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                
            </View>
        </View>
    )
}

export default CustomHeaderForChat

const makeStyles = (H, W) => StyleSheet.create({
    container:
    {
        //borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        backgroundColor: Colors.PRIMARY,
        padding: 8,
        //paddingTop:20,
        //backgroundColor: 'red',
    },
    locationBox:
    {
        height: 40,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 8,
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationText:
    {
        maxWidth: W * 0.35,
    },
    titleText: {
        ...Fonts.larMedium,
        textAlign: 'center'
    }
})