import axios from 'axios'

const instance = axios.create({
    baseURL : 'https://guesttracker-d57cb.firebaseio.com/'
});

export default instance;