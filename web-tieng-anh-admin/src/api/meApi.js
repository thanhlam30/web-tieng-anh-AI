import axiosClient from "./axiosClient";

const URL = "/user/me";

const meApi = {
  fetchNameRoles: () => {
    return axiosClient.get(`${URL}/role`);
  },
};

export default meApi;
