import axiosClient from "./axiosClient";

const courseApi = {
	getCourses: (params) => {
		const url = "/courses";
		return axiosClient.get(url, { params });
	},

	getCourseWords: (params) => {
		const url = "/course-words";
		return axiosClient.get(url, { params });
	},

	getTopics: () => {
		const url = "/courses/topics";
		return axiosClient.get(url);
	},

	getCourseDetail: (slug) => {
		const url = `/courses/${slug}`;
		return axiosClient.get(url);
	},
};

export default courseApi;
