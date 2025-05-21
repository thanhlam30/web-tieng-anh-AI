import axiosClient from "./axiosClient";

const BASE_URL = "/admin/videos/categories";

const videoCategoryApi = {
	fetchVideoCategories: () => {
		return axiosClient.get("/video-categories");
	},

	addVideoCategory: (category) => {
		return axiosClient.post(BASE_URL, category);
	},

	updateVideoCategory: (categoryId, category) => {
		const url = `${BASE_URL}/${categoryId}`;
		return axiosClient.put(url, category);
	},

	deleteVideoCategory: (categoryId) => {
		const url = `${BASE_URL}/${categoryId}`;
		return axiosClient.delete(url);
	},
};

export default videoCategoryApi;
