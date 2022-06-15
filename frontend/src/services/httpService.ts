import axios from 'axios';

import config from '../config';
const { baseUrl } = config;

export default axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-type': 'application/json',
    },
});
