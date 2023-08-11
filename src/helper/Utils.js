import axios from "axios";
import { Alert } from "react-native";

export const LOCAL_STORE = {
    LOGIN: 'loginStatus'
}

export const Constants = {
    BASE_URL: 'https://thebabysitterclubs.com/babysitter/api/v1/'
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
            Alert.alert(error?.message);
        })
        .finally(() => {
            console.log('POST request completed.');
        });
};


export const handleGetRequest = (name) => {
    let config = {
        method: 'get',
        url: `${Constants.BASE_URL}${name}`,
        headers: {}
    };

    return axios.request(config)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            Alert.alert(error?.message);
        });

};