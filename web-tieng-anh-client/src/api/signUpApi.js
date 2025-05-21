import axiosClient from "./axiosClient";

const signUpApi = {
  signUp: (name, username, password) => {
    const url = "auth/sign-up";

    return axiosClient.post(url, { name, username, password });
  },
};

export default signUpApi;