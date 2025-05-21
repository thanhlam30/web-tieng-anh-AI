import { EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, message, Row, Space, Spin } from "antd";
import Modal from "antd/lib/modal/Modal";
import { courseApi } from "api";
import ModalTitle from "components/ModalTitle";
import {
	ImageField,
	InputField,
	SelectedField,
	TextAreaField,
} from "customfield";
import { fetchCourses } from "features/Course/courseSlice";
import { courseValues } from "features/Course/initialAndValidateValues";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function CourseModal(props) {
	const dispatch = useDispatch();
	const { topics } = useSelector((state) => state.course);
	const { isModalVisible, setIsModalVisible, isAddMode, initialValue, query } =
		props;

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleSubmit = async (values) => {
		const { id, image } = values;

		const course = { ...values };
		delete course.image;

		let response;

		if (isAddMode) {
			response = await courseApi.addCourse(course);
		} else {
			response = await courseApi.updateCourse(id, course);
		}

		if (response.error) {
			const error = response.error;
			for (const property in error) {
				message.error(error[property]);
			}
		} else {
			message.info(typeof image);
			if (image && typeof image === "object") {
				const courseId = isAddMode ? response.id : id;
				await courseApi.updateCourseImage(courseId, image);
			}
			message.success(`${isAddMode ? "Thêm" : "Cập nhật"} thành công`);
			handleCancel();
		}
		dispatch(fetchCourses(query));
	};

	return (
		<div id="blog-add-page">
			<Modal
				title={
					<ModalTitle
						title={isAddMode ? "Thêm mới" : "Cập nhật"}
						icon={isAddMode ? <PlusOutlined /> : <EditOutlined />}
					/>
				}
				visible={isModalVisible}
				footer={null}
				onCancel={handleCancel}
				style={{ top: 30 }}
				width={1000}
			>
				<Formik
					initialValues={initialValue}
					validationSchema={courseValues.validationSchema}
					onSubmit={handleSubmit}
					enableReinitialize
				>
					{(formikProps) => {
						const { values, errors, touched, isSubmitting } = formikProps;
						return (
							<Form>
								<Space
									direction="vertical"
									size="middle"
									style={{ width: "100%" }}
								>
									<FastField component={InputField} name="id" type="hidden" />
									<FastField
										name="name"
										component={InputField}
										title="Tên khóa học"
										titleCol={6}
										maxLength={200}
										inputCol={18}
										isRequire={true}
									/>
									<FastField
										name="topicId"
										component={SelectedField}
										title="Chủ đề"
										options={topics.map((topic) => ({
											key: topic.id,
											value: topic.name,
										}))}
										titleCol={6}
										inputCol={18}
										isRequire={true}
									/>
									<FastField
										name="description"
										component={TextAreaField}
										title="Mô tả"
										maxLength={500}
										titleCol={6}
										inputCol={18}
										isRequire={true}
										rows={5}
									/>
									<FastField
										name="image"
										component={ImageField}
										title="Ảnh"
										titleCol={6}
										inputCol={18}
									/>
								</Space>
								<Row justify="end" style={{ marginTop: "20px" }}>
									<Col>
										<Space size="middle">
											<Button onClick={handleCancel}>Hủy</Button>

											<Button htmlType="submit" type="primary">
												{isSubmitting && (
													<Spin
														indicator={
															<LoadingOutlined
																style={{ color: "white" }}
																spin
															/>
														}
													/>
												)}
												{isAddMode ? "Thêm" : "Lưu"}
											</Button>
										</Space>
									</Col>
								</Row>
							</Form>
						);
					}}
				</Formik>
			</Modal>
		</div>
	);
}
CourseModal.propTypes = {
	isModalVisible: PropTypes.bool,
	setIsModalVisible: PropTypes.func,
	isAddMode: PropTypes.bool,
	initialValue: PropTypes.object,
	query: PropTypes.object,
};

CourseModal.defaultProps = {
	isModalVisible: false,
	setIsModalVisible: null,
	isAddMode: true,
	initialValue: courseValues.initial,
	initialValue: {
		name: "",
		topicSlug: "",
		page: 0,
		size: 10,
	},
};
export default CourseModal;
