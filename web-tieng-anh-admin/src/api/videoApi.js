import axiosClient from "./axiosClient";

const BASE_URL = "/admin/videos";

const videoApi = {
	fetchVideos: (params) => {
		return axiosClient.get("/videos", { params });
	},

	fetchVideo: (slug) => {
		const url = `/videos/${slug}`;
		return axiosClient.get(url);
	},

	addVideo: (video) => {
		return axiosClient.post(BASE_URL, video);
	},

	updateVideo: (id, video) => {
		const url = `${BASE_URL}/${id}`;
		return axiosClient.put(url, video);
	},

	deleteVideo: (id) => {
		const url = `${BASE_URL}/${id}`;
		return axiosClient.delete(url);
	},

	updateVideoImage: (id, image) => {
		const url = `${BASE_URL}/${id}/image`;
		return axiosClient.put(url, image);
	},
	updateVideoFile: (id, video) => {
		const url = `${BASE_URL}/${id}/video`;
		console.log(url);

		return axiosClient.put(url, video);
	},
};

export default videoApi;
