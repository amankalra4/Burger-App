import axios from 'axios';

const instance = axios.create({
    // the below link is the link given in the frebase under you database.
    baseURL: 'https://my-burger-db-c34c2.firebaseio.com/'
});

export default instance;