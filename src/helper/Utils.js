import axios from "axios";

export const LOCAL_STORE = {
    LOGIN: 'loginStatus'
}

export const handlePostRequest = async () => {
    try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
            title: 'New Post',
            body: 'This is the body of the new post.',
            userId: 1,
            key: 8,
        });
        console.log('POST response:', response.data);
    } catch (error) {
        console.error('POST error:', error);
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