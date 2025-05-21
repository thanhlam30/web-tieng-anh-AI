import * as Yup from "yup";

export const userValues = {
	initial: {
		id: 0,
		name: "",
		username: "",
		password: "",
	},

	validationSchema: Yup.object().shape({
		name: Yup.string().required("Tên không được bỏ trống"),
		username: Yup.string().required("Tài khoản không được bỏ trống"),
		password: Yup.string().required("Mật khẩu không được bỏ trống"),
	}),
};
