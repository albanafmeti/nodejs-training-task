import axios from 'axios';
import Auth from './Auth';
const auth_token = Auth.token();

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    params: {
        _token: auth_token
    },
});

class ApiClient {

    static get(url, options = {}) {
        return axiosInstance.get(url, options);
    }

    static post(url, data, options = {}) {
        return axiosInstance.post(url, data, options);
    }
}

export default ApiClient;