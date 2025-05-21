import axiosClient from "./axiosClient";

const BASE_URL = "/admin/users";

const userApi = {
	fetchUsers: (params) => {
		return axiosClient.get(BASE_URL, { params });
	},

	fetchVideo: (slug) => {
		const url = `/videos/${slug}`;
		return axiosClient.get(url);
	},

	addUser: (user) => {
		return axiosClient.post(BASE_URL, user);
	},

	deleteUser: (id) => {
		const url = `${BASE_URL}/${id}`;
		return axiosClient.delete(url);
	},

	updateAdminRole: (id) => {
		const url = `${BASE_URL}/${id}/admin-role`;
		return axiosClient.put(url);
	},

	updateUserRoles: (id, roles) => {
		const url = `${BASE_URL}/${id}/update-roles`;
		return axiosClient.put(url, roles);
	},
};

export default userApi;
