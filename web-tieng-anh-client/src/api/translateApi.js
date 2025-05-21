import axiosClient from "./axiosClientNode";

const translateApi = {
	getTranslate: (wordToTranslate) => {
		const pathVariable = wordToTranslate.replaceAll(" ", "-");

		const url = `/Words/${pathVariable}`;
		return axiosClient.get(url);
	},
};

export default translateApi;
