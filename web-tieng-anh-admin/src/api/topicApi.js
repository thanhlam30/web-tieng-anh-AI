import axiosClient from "./axiosClient";

const BASE_URL = "/admin/courses/topics";

const topicApi = {
	fetchTopics: () => {
		return axiosClient.get("/courses/topics");
	},

	addTopic: (topic) => {
		return axiosClient.post(BASE_URL, topic);
	},

	updateTopic: (id, topic) => {
		const url = `${BASE_URL}/${id}`;
		return axiosClient.put(url, topic);
	},

	deleteTopic: (id) => {
		const url = `${BASE_URL}/${id}`;
		return axiosClient.delete(url);
	},
};

export default topicApi;
