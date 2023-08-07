import { Image, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { DataTable, Divider, Text } from 'react-native-paper'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import Spaces from '../helper/Spaces'
import Fonts from '../helper/Fonts'
import Colors from '../helper/Colors'
import SmallWhiteButton from '../components/SmallWhiteButton'

const ParentProfile = ({ navigation, route }) => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const styles = makeStyles(H, W)
    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.contentContainerStyle}
                style={styles.container}>
                <View style={styles.upperContainer}>
                    <View>
                        <Image defaultSource={require('../assets/images/profile-user.png')}
                            style={styles.profilePic}
                        />
                    </View>
                    <View>
                        <Text style={[styles.heading, { marginBottom: 0 }]}>Gracie</Text>
                        <Text style={[styles.textSecondary, { marginBottom: 0 }]}>Babysitting job in Dallas</Text>
                        <View style={styles.whiteBox}>
                            <Text style={[styles.text, { marginBottom: 0, ...Fonts.sm }]}> ~ 2 km away</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.lowerContainer}>
                    <Text style={styles.text}>
                        Hello! My husband and I are just starting to use sitters here and there for our 7 months old.
                        We own a business and need someone on average one day, weekly or bi-weekly for date nights/days,
                        client calls needing both of us, or a rest day for mom.
                    </Text>
                    <Text style={styles.text}>
                        Characteristics of the children
                        <Text style={styles.text}>Curious, Funny, Intelligent</Text>
                    </Text>
                    <Text>
                        <Text style={styles.subheading}>Number of children: </Text>
                        <Text style={styles.text}>1</Text>
                    </Text>
                    <Text>
                        <Text style={styles.subheading}>Age of children: </Text>
                        <Text style={styles.text}>Baby</Text>
                    </Text>

                    <Text style={styles.warning}>
                        For your own safety and protection, only communicate through this app.
                        Never pay for anything and don't share personal information like ID documents and bank details with someone you have never met.
                    </Text>
                    <Text style={styles.heading}>When we need a babysitter</Text>
                    <Divider style={styles.divider} />
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title></DataTable.Title>
                            <DataTable.Title>Mo</DataTable.Title>
                            <DataTable.Title>Tu</DataTable.Title>
                            <DataTable.Title>We</DataTable.Title>
                            <DataTable.Title>Th</DataTable.Title>
                            <DataTable.Title>Fr</DataTable.Title>
                            <DataTable.Title>Sa</DataTable.Title>
                            <DataTable.Title>Su</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Row>
                            <DataTable.Title>Morning</DataTable.Title>
                            <DataTable.Title><AntDesign name="checkcircle" /></DataTable.Title>
                            <DataTable.Title></DataTable.Title>
                            <DataTable.Title></DataTable.Title>
                            <DataTable.Title></DataTable.Title>
                            <DataTable.Title></DataTable.Title>
                            <DataTable.Title></DataTable.Title>
                            <DataTable.Title></DataTable.Title>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Title>Afternoon</DataTable.Title>
                            <DataTable.Title></DataTable.Title>
                            <DataTable.Title><AntDesign name="checkcircle" /></DataTable.Title>
                            <DataTable.Title><AntDesign name="checkcircle" /></DataTable.Title>
                            <DataTable.Title></DataTable.Title>
                            <DataTable.Title><AntDesign name="checkcircle" /></DataTable.Title>
                            <DataTable.Title></DataTable.Title>
                            <DataTable.Title><AntDesign name="checkcircle" /></DataTable.Title>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Title>Evening</DataTable.Title>
                            <DataTable.Title></DataTable.Title>
                            <DataTable.Title></DataTable.Title>
                            <DataTable.Title></DataTable.Title>
                            <DataTable.Title><AntDesign name="checkcircle" /></DataTable.Title>
                            <DataTable.Title><AntDesign name="checkcircle" /></DataTable.Title>
                            <DataTable.Title></DataTable.Title>
                            <DataTable.Title><AntDesign name="checkcircle" /></DataTable.Title>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Title textStyle={{ fontSize: 10 }}>Night</DataTable.Title>
                            <DataTable.Title></DataTable.Title>
                            <DataTable.Title></DataTable.Title>
                            <DataTable.Title></DataTable.Title>
                            <DataTable.Title></DataTable.Title>
                            <DataTable.Title><AntDesign name="checkcircle" /></DataTable.Title>
                            <DataTable.Title><AntDesign name="checkcircle" /></DataTable.Title>
                            <DataTable.Title></DataTable.Title>
                        </DataTable.Row>
                    </DataTable>
                    <Text style={styles.heading}>About our family</Text>
                    <Text style={styles.text}>
                        <Text style={styles.subheading}>Type of babysitter needed: </Text>
                        <Text style={styles.text}>Babysitter</Text>
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.subheading}>Preferred babysitting location: </Text>
                        <Text style={styles.text}>At the family</Text>
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.subheading}>Languages we speak: </Text>
                        <Text style={styles.text}>English</Text>
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.subheading}>Favorited: </Text>
                        <Text style={styles.text}>6 Times</Text>
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.subheading}>We need a babysitter comfortable with: </Text>
                        <Text style={styles.text}>Pets</Text>
                    </Text>

                </View>
            </ScrollView>
            <View style={styles.floatingView}>
                <View style={styles.secondaryFloatingView}>
                    <Text style={[styles.text, styles.floatText, { ...Fonts.larBold }]}>US$13.00/hr</Text>
                    <Text style={[styles.subheading, styles.floatText]}>Hourly rate for babysitting</Text>
                </View>
                <View style={styles.secondaryFloatingView}>
                    <SmallWhiteButton title='Contact Gracie' />
                </View>
            </View>
        </View>
    )
}

export default ParentProfile

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
        marginBottom: Spaces.med
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
        color: Colors.gray,
        marginVertical: Spaces.med
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
        height:H*0.13
    },
    floatText:
    {
        color: Colors.white,
        marginVertical: 0,
        marginBottom: 0
    },
}) 