import axiosClient from "./axiosClient";
const BASE_URL = '/admin/exams/books';

const bookApi = {
    fetchBook: () => {
        return axiosClient.get('/books');
    },

    addBook: (book) => {
        return axiosClient.post(BASE_URL, book);
    },
    deleteBook: (bookId) => {
        return axiosClient.delete(`${BASE_URL}/${bookId}`);
    },

    updateBook: (bookId, book) => {
        return axiosClient.put(`${BASE_URL}/${bookId}`, book);
    },

    updateBookImage: (bookId, image) => {
        return axiosClient.put(`${BASE_URL}/${bookId}/image`, image);
    }


};

export default bookApi;