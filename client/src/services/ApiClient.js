import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    params: {
        _token: 12345
    },
});

class ApiClient {

    static get(url, options) {
        return axiosInstance.get(url, options);
    }

    static post(url, data, options) {
        return axiosInstance.post(url, data, options);
    }
}

export default ApiClient;