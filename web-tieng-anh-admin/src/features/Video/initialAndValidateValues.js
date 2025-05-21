import * as Yup from "yup";

export const videoValues = {
	initial: {
		id: 0,
		name: "",
		duration: 0,
		level: 0,
		description: "",
		categoryId: 0,
		image: "",
		video: "",
	},

	validationSchema: Yup.object().shape({
		name: Yup.string().required("Tên video không được bỏ trống"),
		duration: Yup.number()
			.required("Thời luọng video không được bỏ trống")
			.min(1, "Thời luọng video không hợp lệ"),
		level: Yup.number().min(1, "Level không được bỏ trống"),
		description: Yup.string().required("Mô tả không được bỏ trống"),
		categoryId: Yup.number().min(1, "Chủ đề video không được bỏ trống"),
	}),
};

export const videoCategoryValues = {
	initial: {
		id: 0,
		name: "",
	},

	validationSchema: Yup.object().shape({
		name: Yup.string().required("Tên danh mục video không được bỏ trống"),
	}),
};

export const videoWordValues = {
	initial: {
		id: 0,
		name: "",
		origin: "",
		frequency: 0,
		sound: "",
	},

	validationSchema: Yup.object().shape({
		name: Yup.string().required("Từ vựng không được bỏ trống"),
		origin: Yup.string().required("Từ gốc không được bỏ trống"),
		frequency: Yup.number()
			.required("Độ phổ biến không được bỏ trống")
			.min(1, "Không hợp lệ"),
	}),
};
export const subtitleValues = {
	initial: {
		id: 0,
		start: 0,
		end: 0,
		content: "",
	},

	validationSchema: Yup.object().shape({
		start: Yup.number()
			.required("Thời gian bắt đầu được bỏ trống")
			.min(0, "Không hợp lệ"),
		end: Yup.number()
			.required("Thời gian kết thúc không được bỏ trống")
			.moreThan(
				Yup.ref("start"),
				"Thời gian kết thúc phải lớn hơn thời gian bắt đầu"
			),
		// .moreThan(Yup.ref("start"), "Không hợp lệ"),
		content: Yup.string().required("Phụ đề không được bỏ trống"),
	}),
};
