import axios from "axios";
import { Alert } from "react-native";
import { getLocalValue } from "./LocalStore";

export const LOCAL_STORE = {
    LOGIN: 'loginStatus',
    TOKEN: 'auth_token',
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


    console.log("Formdata=======>", formdata)

    return axios(config)
        .then(response => {
            // console.log('POST response:', response);
            return response.data;
        })
        .catch(error => {
            Alert.alert(error?.message);
        })
        .finally(() => {
            console.log('POST request completed.=========================', `${name}`);
        });
};


export const handleGetRequest = async (name) => {
    const token = await getLocalValue(LOCAL_STORE.TOKEN)
    let config = {
        method: 'get',
        url: `${Constants.BASE_URL}${name}`,
        headers: { 'Authorization': `Bearer ${token}` }
    };

    return axios.request(config)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            Alert.alert(error?.message);
        }).finally(() => {
            console.log('GET request completed.=========================', `${name}`);
        });

};