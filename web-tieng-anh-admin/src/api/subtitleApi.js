import axiosClient from "./axiosClient";

const BASE_URL = "/admin/videos/subtitles";

const subtitleApi = {
	addSubtitle: (subtitle) => {
		return axiosClient.post(BASE_URL, subtitle);
	},

	updateSubtitle: (id, subtitle) => {
		const url = `${BASE_URL}/${id}`;
		return axiosClient.put(url, subtitle);
	},

	deleteSubtitle: (id) => {
		const url = `${BASE_URL}/${id}`;
		return axiosClient.delete(url);
	},
};

export default subtitleApi;
