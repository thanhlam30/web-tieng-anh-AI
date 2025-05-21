import axiosClient from "./axiosClient";

const BASE_ENDPOINT = "/user/word-note-categories";

const wordNoteApi = {
	getWordNotes: () => {
		return axiosClient.get(BASE_ENDPOINT);
	},

	addNewWordNote: (params) => {
		const { name } = params;
		return axiosClient.post(BASE_ENDPOINT, { name });
	},

	updateWordNote: (params) => {
		const { id, name } = params;
		const url = `${BASE_ENDPOINT}/${id}`;
		return axiosClient.put(url, { name });
	},

	deleteWordNote: (id) => {
		const url = `${BASE_ENDPOINT}/${id}`;
		return axiosClient.delete(url);
	},

	addToWordNote: (params) => {
		const url = `${BASE_ENDPOINT}/add-word`;

		const { wordId, wordNoteCategoryId } = params;
		return axiosClient.post(url, { wordId, wordNoteCategoryId });
	},

	deleteFromWordNote: (params) => {
		const { wordnoteId, wordId } = params;
		const url = `${BASE_ENDPOINT}/${wordnoteId}/words/${wordId}`;
		return axiosClient.delete(url);
	},

	getWordNoteDetail: (wordnoteId) => {
		const url = `${BASE_ENDPOINT}/${wordnoteId}`;
		return axiosClient.get(url);
	},

	getWordNoteReview: (wordnoteId, params) => {
		const url = `${BASE_ENDPOINT}/review/${wordnoteId}`;
		return axiosClient.get(url, { params });
		// return axiosClient.get(url, {
		// 	params: {
		// 		type: params.type,
		// 		ids: params.ids,
		// 	},
		// });
	},
};

export default wordNoteApi;
