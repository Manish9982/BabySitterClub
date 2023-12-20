import { Alert, FlatList, ImageBackground, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import { handleGetRequest, handlePostRequest } from '../helper/Utils'
import JobPostingCard from '../components/JobPostingCard'
import Spaces from '../helper/Spaces'

const JOBSDATA = {
    "status": 200,
    "message": "Jobs get successfully",
    "alert": "No jobs have been posted yet, we wil notify you when a new job is posted.",
    "url": "https://thebabysitterclubs.com/babysitter/public/",
    "data": [
        {
            "rapid_id": 3,
            "price": 10,
            "duration": "09:00 AM - 01:00 PM",
            "comment": "Need a Sitter for my 6 year old who can also look after my pet dog, Breed: German Shepherd",
            "profile": "uploads/profile/1701417340.",
            "name": "Cassandra Morgan",
            "address": "88, 8800 South Polk Street, Dallas, TX, USA",
            "latitude": "32.640803",
            "longitude": "-96.83924549999999",
            "sitter_latitude": "32.640803",
            "sitter_longitude": "-96.83924549999999",
            "distance": 0
        }
    ]
}

const JobPostings_Sitter = ({ navigation }) => {
    const [jobsData, setJobsData] = useState(null)
    const [loader, setLoader] = useState(true)

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

    const renderJobs = ({ item }) => {
        return (
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
        )
    }

    return (
        <ImageBackground
            source={require('../assets/images/background.png')}
            style={styles.container}
        >
            {
                jobsData?.data?.length == 0
                    ?
                    <View style={styles.centeredView}>
                        <Text>{jobsData?.alert}</Text>
                    </View>
                    :
                    <FlatList
                        data={jobsData?.data}
                        renderItem={renderJobs}
                        keyExtractor={(item, index) => `${index}`}
                    />

            }

        </ImageBackground>
    )
}

export default JobPostings_Sitter

const styles = StyleSheet.create({
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
    }

})