import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://formassignment-33325-default-rtdb.firebaseio.com/'
});

export default instance; 