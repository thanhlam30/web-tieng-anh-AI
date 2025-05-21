import axiosClient from "./axiosClient";

const BASE_URL = "/admin/exams/paragraphs";

const paragraphApi = {
	updateParagraph: (id, paragraph) => {
		const url = `${BASE_URL}/${id}`;
		return axiosClient.put(url, paragraph);
	},

	updateParagraphImage: (id, image) => {
		const url = `${BASE_URL}/${id}/image`;
		return axiosClient.put(url, image);
	},

	updateParagraphAudio: (id, audio) => {
		const url = `${BASE_URL}/${id}/audio`;
		return axiosClient.put(url, audio);
	},
};

export default paragraphApi;
