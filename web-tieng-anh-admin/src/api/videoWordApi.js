import axiosClient from "./axiosClient";

const BASE_URL = "/admin/videos/words";

const videoWordApi = {
	addVideoWord: (videoWord) => {
		return axiosClient.post(BASE_URL, videoWord);
	},

	updateVideoWord: (id, videoWord) => {
		const url = `${BASE_URL}/${id}`;
		return axiosClient.put(url, videoWord);
	},

	deleteVideoWord: (id) => {
		const url = `${BASE_URL}/${id}`;
		return axiosClient.delete(url);
	},

	updateVideoWordSound: (id, sound) => {
		const url = `${BASE_URL}/${id}/sound`;
		return axiosClient.put(url, sound);
	},
};

export default videoWordApi;
