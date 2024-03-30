import React, { useState } from 'react';
import { View, TextInput, Button, Linking, Alert, StyleSheet, useWindowDimensions } from 'react-native';
import TextInputComponent from '../components/TextInputComponent';
import CustomButton from '../components/Button';
import Fonts from '../helper/Fonts';
import Spaces from '../helper/Spaces';
import { handlePostRequest } from '../helper/Utils';
import { Text } from 'react-native-paper';


const Help = ({ navigation }) => {
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)

    const [issueName, setIssueName] = useState('');
    const [description, setDescription] = useState('');

    const [loader, setLoader] = useState(false)


    const handleDoneButtonPress = async () => {
        if (issueName.trim() === '' || description.trim() === '') {
            Alert.alert('Error', 'Please fill in all fields.');
        } else {

            setLoader(true)

            var formdata = new FormData()
            formdata.append("title", issueName);
            formdata.append("description", description);

            const result = await handlePostRequest('add_help_support', formdata)

            if (result.status == "200") {
                navigation.goBack()
                Alert.alert('Success', 'Issue submitted successfully.');

            } else if (result.status == "201") {
                Alert.alert("Error", result.message)

            } else {
                Alert.alert("Alert", result.message)
            }

            setLoader(false)
        }
    };

    const handleCallSupport = () => {
        // Replace '123-456-7890' with your actual support phone number.
        Linking.openURL('tel:123-456-7890');
    };

    const handleChatSupport = () => {
       //Alert.alert("Feature Coming Soon..")
       navigation.navigate('SupportChat_ParentAndAdmin', { user_id: "1" })
    };

    return (
        <View style={styles.uppercontainer}>
            <TextInputComponent
                placeholder='Enter Issue'
                value={issueName}
                onChangeText={(text) => { setIssueName(text) }}
            />

            <TextInputComponent
                placeholder='Enter Description'
                value={description}
                multiline={true}
                onChangeText={(text) => { setDescription(text) }}
            />

            <CustomButton
                loader={loader}
                title={'Continue'}
                onPressButton={handleDoneButtonPress}
            />

            <Text style={[styles.text1, Fonts.medSemiBold]}>Or</Text>

            <CustomButton
                //loader={loader}
                title={'Call Support'}
                onPressButton={handleCallSupport}
            />
            <Text style={[styles.text1, Fonts.medSemiBold]}>Or</Text>

            <CustomButton
                //loader={loader}
                title={'Chat with Support'}
                onPressButton={handleChatSupport}
            />
        </View>
    );
};

export default Help

const makeStyles = (H, W) => StyleSheet.create({

    uppercontainer: {
        flex: 1,
        padding: Spaces.sm
    },

    text1:
    {
        alignSelf: 'center',
        marginVertical: Spaces.sm
    },

})