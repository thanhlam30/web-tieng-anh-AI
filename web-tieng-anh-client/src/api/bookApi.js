import axiosClient from './axiosClient';

const bookApi = {

    fetchBooks: () => {

        return axiosClient.get("/books");
    },

};

export default bookApi;