import axios from 'axios';
import Auth from './Auth';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/'
});

class ApiClient {

    static axiosInstance = axiosInstance;

    static config() {
        const auth_token = Auth.token();

        ApiClient.axiosInstance.defaults.params = {
            _token: auth_token
        };
    }

    static get(url, options = {}) {
        ApiClient.config();
        return ApiClient.axiosInstance.get(url, options);
    }

    static post(url, data, options = {}) {
        ApiClient.config();
        return ApiClient.axiosInstance.post(url, data, options);
    }
}

export default ApiClient;