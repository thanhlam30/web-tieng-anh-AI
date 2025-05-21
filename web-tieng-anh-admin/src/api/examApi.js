import axiosClient from "./axiosClient";

const BASE_URL = "/admin/exams";

const examApi = {
	fetchExams: (params) => {
		return axiosClient.get(BASE_URL, { params });
	},

	fetchBooks: (params) => {
		return axiosClient.get("/books");
	},

	addExam: (exam, stts) => {
		return axiosClient.post(BASE_URL, exam, {
			params: { stts },
		});
	},

	updateExam: (id, exam) => {
		const url = `${BASE_URL}/${id}`;
		return axiosClient.put(url, exam);
	},

	deleteExam: (id) => {
		const url = `${BASE_URL}/${id}`;
		return axiosClient.delete(url);
	},

	updateExamAudio: (id, audio) => {
		const url = `${BASE_URL}/${id}/audio`;
		console.log(audio);
		return axiosClient.put(url, audio);
	},
};

export default examApi;
