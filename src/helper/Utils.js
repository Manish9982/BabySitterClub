import axios from "axios";
import { Alert } from "react-native";

export const LOCAL_STORE = {
    LOGIN: 'loginStatus'
}

export const Constants = {
    BASE_URL: 'https://thebabysitterclubs.com/babysitter/public/api/v1/'
}

export const handlePostRequest = (name, formdata) => {
    const config = {
        method: 'post',
        url: `${Constants.BASE_URL}${name}`,

        data: formdata,
        redirect: 'follow',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',

        },
    };

    console.log('POST request completed.=========================', `${Constants.BASE_URL}${name}`);


    return axios(config)
        .then(response => {
            console.log('POST response:', response);
            return response.data;
        })
        .catch(error => {
            Alert.alert(error);
        })
        .finally(() => {
            console.log('POST request completed.');
        });
};


export const handleGetRequest = async (name) => {
    try {
        const response = await axios.get(`${Constants.BASE_URL}${name}`);
        console.log('GET response:', response.data);
        return response.data
    } catch (error) {
        console.error('GET error:', error);
    } finally {
        console.log('GET request completed.');
    }
};