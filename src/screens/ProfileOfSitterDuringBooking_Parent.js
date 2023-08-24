import { Alert, Image, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { DataTable, Divider, Text } from 'react-native-paper'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import Spaces from '../helper/Spaces'
import Fonts from '../helper/Fonts'
import Colors from '../helper/Colors'
import SmallWhiteButton from '../components/SmallWhiteButton'
import Loader from '../components/Loader'
import { handlePostRequest } from '../helper/Utils'

const ProfileOfSitterDuringBooking_Parent = ({ navigation, route }) => {

    console.log("UserID =    ", route?.params?.userID)

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const [profiledetailsdata, setProfiledetailsdata] = useState()
    const [loader, setLoader] = useState(true)
    const [image, setImage] = useState({})


    useEffect(() => {
        getUsersProfileDetails()
    }, [])


    const getUsersProfileDetails = async () => {
        const formdata = new FormData()
        formdata.append('userId', route?.params?.userID)
        const result = await handlePostRequest('user_details', formdata)
        console.log("Results==========   ", result)

        if (result?.status == '200') {
            setProfiledetailsdata(result)
        } else if (result?.status == '201') {
            Alert.alert("Error", result?.message)
            navigation.goBack()
        }
        setLoader(false)
    }


    const styles = makeStyles(H, W)
    return (
        loader
            ?
            <Loader />
            :
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.contentContainerStyle}
                    style={styles.container}>
                    <View style={styles.upperContainer}>
                        <View>

                            <Image
                                source={{ uri: `${profiledetailsdata?.url}${profiledetailsdata?.userDetails?.picture}` }}
                                defaultSource={require('../assets/images/profile-user.png')}
                                style={styles.profilePic}
                            />
                        </View>
                        <View>
                            <Text style={[styles.heading, { marginBottom: 0 }]}>{`${profiledetailsdata?.userDetails?.first_name} ${profiledetailsdata?.userDetails?.last_name}`}</Text>
                            <Text style={[styles.textSecondary, { marginBottom: 0 }, Fonts.medMedium]}>{profiledetailsdata?.userDetails?.address}</Text>
                            <View style={styles.whiteBox}>
                                <Text style={[styles.text, { marginBottom: 0, ...Fonts.larMedium }]}> {`$ ${profiledetailsdata?.userDetails?.hour_price}/hrs`}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.lowerContainer}>
                        <Text style={styles.text}>
                            {profiledetailsdata?.userDetails?.description}
                        </Text>
                        {/* <Text style={styles.text}>
                            Characteristics of the children
                            <Text style={styles.text}>Curious, Funny, Intelligent</Text>
                        </Text> */}
                        <Text>
                            <Text style={styles.subheading}>Favorited: </Text>
                            <Text style={[styles.text, Fonts.medMedium]}>{profiledetailsdata?.userDetails?.no_of_children} times</Text>
                        </Text>
                        {/* <Text>
                            <Text style={styles.subheading}>Age of children: </Text>
                            <Text style={styles.text}>Baby</Text>
                        </Text> */}

                        <Text style={styles.warningtitle}>Warning: </Text>

                        <Text style={[styles.warning, Fonts.smMedium]}>
                            For your own safety and protection, only communicate through this app.
                            Never pay for anything and don't share personal information like ID documents and bank details with someone you have never met.
                        </Text>
                        <Text style={styles.textneedbabysittertitle}>Availability</Text>
                        <Divider style={styles.divider} />

                    </View>
                </ScrollView>
                <View style={styles.floatingView}>
                    <View style={styles.secondaryFloatingView}>
                        <Text style={[styles.text, styles.floatText,

                        { ...Fonts.larBold }]}>{`$${profiledetailsdata?.userDetails?.hour_price}/hrs`}</Text>

                        <Text style={[styles.subheading, styles.floatText]}>Total Price</Text>
                    </View>
                    <View style={styles.secondaryFloatingView}>
                        <SmallWhiteButton title={`${"Contact"} ${profiledetailsdata?.userDetails?.first_name}`} />
                    </View>
                </View>
            </View>
    )
}

export default ProfileOfSitterDuringBooking_Parent

const makeStyles = (H, W) => StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: H * 0.13
    },
    secondaryFloatingView: {
        flex: 1,
    },
    heading: {
        ...Fonts.larBold,
        marginBottom: Spaces.med,
        color: "white"
    },
    textneedbabysittertitle: {
        ...Fonts.larMedium,
        color: "black",
        marginTop: H * 0.025
    },
    subheading: {
        ...Fonts.medBold,
        marginBottom: Spaces.med,
    },
    text: {
        marginBottom: Spaces.med,
    },
    divider: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: Spaces.med,
    },
    contentContainerStyle:
    {

    },
    textSecondary:
    {
        ...Fonts.sm,
        color: Colors.white,
        marginBottom: Spaces.med,
        width: W * 0.7
    },
    whiteBox:
    {
        borderRadius: 8,
        backgroundColor: Colors.white,
        alignSelf: 'flex-start',
        padding: Spaces.sm,
        marginVertical: Spaces.sm
    },
    upperContainer:
    {
        backgroundColor: Colors.buttoncolor,
        padding: Spaces.med,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spaces.med
    },
    profilePic:
    {
        height: H * 0.13,
        width: H * 0.13,
        borderRadius: H * 0.13 / 2,
        marginRight: Spaces.med
    },
    lowerContainer:
    {
        padding: Spaces.med
    },
    warning:
    {
        ...Fonts.medMedium,
        color: 'gray',
    },
    warningtitle:
    {
        ...Fonts.larMedium,
        color: 'red',
        marginTop: H * 0.025
    },
    floatingView:
    {
        position: 'absolute',
        bottom: H * 0,
        backgroundColor: Colors.buttoncolor,
        width: '100%',
        flexDirection: 'row',
        padding: Spaces.xl,
        flex: 2,
        height: H * 0.13
    },
    floatText:
    {
        color: Colors.white,
        marginVertical: 0,
        marginBottom: 0
    },
}) 