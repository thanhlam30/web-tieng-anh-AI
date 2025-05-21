import { EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, message, Modal, Row, Space, Spin } from "antd";
import { videoCategoryApi } from "api";
import ModalTitle from "components/ModalTitle";
import { InputField } from "customfield";
import { topicValues } from "features/Course/initialAndValidateValues";
import { videoCategoryValues } from "features/Video/initialAndValidateValues";
import { fetchVideoCategories } from "features/Video/videoSlice";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";

function CategoryModal(props) {
	const { isModalVisible, setIsModalVisible, isAddMode, initialValue } = props;
	const dispatch = useDispatch();

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleSubmit = async (values) => {
		const { id, name } = values;

		let response;
		if (isAddMode) {
			response = await videoCategoryApi.addVideoCategory({ name });
		} else {
			response = await videoCategoryApi.updateVideoCategory(id, { name });
		}

		if (response.error) {
			const error = response.error;
			for (const property in error) {
				message.error(error[property]);
			}
		} else {
			message.success(`${isAddMode ? "Thêm" : "Cập nhật"} thành công`);
			handleCancel();
		}

		dispatch(fetchVideoCategories());
	};

	return (
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
		>
			<Formik
				initialValues={initialValue}
				onSubmit={handleSubmit}
				validationSchema={videoCategoryValues.validationSchema}
				enableReinitialize
			>
				{(formikProps) => {
					const { isSubmitting } = formikProps;
					{
						/* const { values, errors, touched, isSubmitting } = formikProps;
					console.log({ values, errors, touched, isSubmitting }); */
					}
					return (
						<Form>
							<FastField component={InputField} name="id" type="hidden" />
							<FastField
								name="name"
								component={InputField}
								title="Tên danh mục"
								titleCol={6}
								inputCol={18}
								isRequire={true}
								placeholder="Ví dụ: Sports"
							/>

							<Row justify="end" style={{ marginTop: "20px" }}>
								<Col>
									<Space size="middle">
										<Button onClick={handleCancel}>Hủy</Button>

										<Button htmlType="submit" type="primary">
											{isSubmitting && (
												<Spin
													indicator={
														<LoadingOutlined style={{ color: "white" }} spin />
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
	);
}

CategoryModal.propTypes = {
	isModalVisible: PropTypes.bool,
	setIsModalVisible: PropTypes.func,
	isAddMode: PropTypes.bool,
	initialValue: PropTypes.object,
};
CategoryModal.defaultProps = {
	isModalVisible: false,
	setIsModalVisible: null,
	isAddMode: true,
	initialValue: topicValues.initial,
};

export default CategoryModal;
