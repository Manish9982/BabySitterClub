import axios from "axios";
import { Alert } from "react-native";

export const LOCAL_STORE = {
    LOGIN: 'loginStatus'
}

export const Constants = {
    BASE_URL: 'https://thebabysitterclubs.com/babysitter/public/api/v1/'
}

export const handlePostRequest = async (name, formdata) => {
    try {
        const config = {
            method: 'post',
            url: `${Constants.BASE_URL}${name}`,
            data: formdata,
            redirect: 'follow',
        };
        const response = await axios(config);
        console.log('POST response:', response);
        return response.data
    } catch (error) {
        Alert.alert(error);
    } finally {
        console.log('POST request completed.');
    }
};

export const handleGetRequest = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        console.log('GET response:', response.data);
    } catch (error) {
        console.error('GET error:', error);
    } finally {
        console.log('GET request completed.');
    }
};