import { Alert, FlatList, ImageBackground, StyleSheet, TouchableOpacity, View, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import { handleGetRequest, handlePostRequest } from '../helper/Utils'
import JobPostingCard from '../components/JobPostingCard'
import Spaces from '../helper/Spaces'
import AcceptSitterCardDetailsOnly from '../components/AcceptSitterCardDetailsOnly'
import CustomButton from '../components/Button'

const JobPostings_Sitter = ({ navigation }) => {
    const [jobsData, setJobsData] = useState(null)
    const [loader, setLoader] = useState(true)
    const [showSitterDetails, setShowSitterDetails] = useState(false)
    const [selectedProfile, setSelectedProfile] = useState(null)

    useEffect(() => {
        getJobs()
    }, [])

    useEffect(() => {
        const getJobsRepeatedly = setInterval(() => {
            getJobs()
        }, 10000);

        return () => {
            clearInterval(getJobsRepeatedly)
        }
    }, [])

    const onCloseDetails = () => {
        setShowSitterDetails(prev => !prev)
    }

    const getJobs = async () => {
        const result = await handleGetRequest('get_sitter_rapid_request')
        if (result?.status == "200") {
            setJobsData(result)
        }
        else {
            Alert.alert("Error", result?.message)
        }
        setLoader(false)
    }

    const onPressCard = (profile) => {
        setSelectedProfile(profile)
        setShowSitterDetails(true)
    }

    const onPressReturn = () => {
        navigation.navigate('BottomTabsSitter')
    }

    const renderJobs = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => onPressCard(item)}>
                <JobPostingCard
                    id={item?.rapid_id}
                    profilePicture={item?.profile}
                    name={item?.name}
                    time={item?.duration}
                    location={item?.address}
                    priceOffered={item?.price}
                    comments={item?.comment}
                    distance={item?.distance}
                    lat1={item?.latitude}
                    long1={item?.longitude}
                    lat2={item?.sitter_latitude}
                    long2={item?.sitter_longitude}
                    baseUrl={jobsData?.url}
                    callbackMain={getJobs}
                />
            </TouchableOpacity>

        )
    }


    return (
        <ImageBackground
            source={require('../assets/images/background.png')}
            style={styles.container}
        >
            <Modal
                visible={showSitterDetails}
                //visible={true}
                transparent={true}
            >
                <View style={styles.overlay}>
                    <AcceptSitterCardDetailsOnly
                        baseUrl={jobsData?.url}
                        flag={1}
                        onClose={onCloseDetails}
                        rating={selectedProfile?.rating}
                        profilePicture={selectedProfile?.profile}
                        name={selectedProfile?.name}
                        description={selectedProfile?.description}
                        priceOffered={selectedProfile?.price}
                        serviceIds={selectedProfile?.service_id}
                    />
                </View>
            </Modal>
            {
                jobsData?.data?.length == 0
                    ?
                    <View style={styles.centeredView}>
                        <Text>{jobsData?.alert}</Text>
                    </View>
                    :
                    <View style={{

                    }}>
                        <FlatList
                            data={jobsData?.data}
                            renderItem={renderJobs}
                            keyExtractor={(item, index) => `${index}`}
                        />
                    </View>
            }
            <CustomButton title={"Return to Dashboard"}
                style={styles.button}
                onPressButton={onPressReturn}
            />
        </ImageBackground>
    )
}

export default JobPostings_Sitter

const styles = StyleSheet.create({
    button: {
        position:'absolute',
        bottom: 0
    },
    container:
    {
        flex: 1
    },
    centeredView:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spaces.med
    },
    overlay:
    {
        zIndex: 2,
        backgroundColor: "rgba(0,0,0,0.4)",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

})