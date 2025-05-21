import * as Yup from "yup";

export const courseValues = {
	initial: {
		id: 0,
		name: "",
		image: "",
		description: "",
		topicId: 0,
	},

	validationSchema: Yup.object().shape({
		name: Yup.string().required("Tên khóa học không được bỏ trống"),
		description: Yup.string().required("Mô tả không được bỏ trống"),
		topicId: Yup.number().min(1, "Chủ đề không được bỏ trống"),
	}),
};

export const topicValues = {
	initial: {
		id: 0,
		name: "",
	},

	validationSchema: Yup.object().shape({
		name: Yup.string().required("Tên chủ đề không được bỏ trống"),
	}),
};
export const wordValues = {
	initial: {
		id: 0,
		name: "",
		mean: "",
		type: "",
		pronounce: "",
		sound: "",
		definition: "",
		example: "",
		image: "",
	},

	validationSchema: Yup.object().shape({
		name: Yup.string().required("Từ vựng không được bỏ trống"),
		type: Yup.string().required("Loại từ không được bỏ trống"),
		pronounce: Yup.string().required("Phát âm không được bỏ trống"),
		definition: Yup.string().required("Định nghĩa không được bỏ trống"),
		example: Yup.string().required("Ví dụ không được bỏ trống"),
		mean: Yup.string().required("Nghĩa không được bỏ trống"),
	}),
};
