import axiosClient from './axiosClient';

const loginApi = {
    login: (username, password) => {
        const url = '/login';

        return axiosClient.post(url, { username, password });
    },
};

export default loginApi;
