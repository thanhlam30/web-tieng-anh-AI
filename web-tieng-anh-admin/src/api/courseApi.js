import axiosClient from "./axiosClient";

const BASE_URL = "/admin/courses";

const courseApi = {
	fetchCourses: (params) => {
		return axiosClient.get("/courses", { params });
	},

	fetchCourse: (slug) => {
		const url = `/courses/${slug}`;
		return axiosClient.get(url);
	},

	addCourse: (course) => {
		return axiosClient.post(BASE_URL, course);
	},

	updateCourse: (id, course) => {
		const url = `${BASE_URL}/${id}`;
		return axiosClient.put(url, course);
	},

	deleteCourse: (id) => {
		const url = `${BASE_URL}/${id}`;
		return axiosClient.delete(url);
	},

	updateCourseImage: (id, image) => {
		const url = `${BASE_URL}/${id}/image`;
		return axiosClient.put(url, image);
	},

	addWordToCourse: (courseId, wordId) => {
		const url = `${BASE_URL}/${courseId}/course-word`;
		return axiosClient.post(url, { wordId });
	},

	deleteFromCourse: (courseId, wordId) => {
		const url = `${BASE_URL}/${courseId}/course-word/${wordId}`;
		return axiosClient.delete(url);
	},
};

export default courseApi;
