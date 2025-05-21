import { EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, message, Modal, Row, Space, Spin } from "antd";
import { topicApi } from "api";
import ModalTitle from "components/ModalTitle";
import { InputField } from "customfield";
import { fetchTopics } from "features/Course/courseSlice";
import { topicValues } from "features/Course/initialAndValidateValues";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";

function TopicModal(props) {
	const { isModalVisible, setIsModalVisible, isAddMode, initialValue } = props;
	const dispatch = useDispatch();

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleSubmit = async (values) => {
		const { id, name } = values;
		let response;
		if (isAddMode) {
			response = await topicApi.addTopic({ name });
		} else {
			response = await topicApi.updateTopic(id, { name });
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

		dispatch(fetchTopics());
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
				validationSchema={topicValues.validationSchema}
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
								title="Tên chủ đề"
								titleCol={6}
								inputCol={18}
								isRequire={true}
								placeholder="Ví dụ: School"
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

TopicModal.propTypes = {
	isModalVisible: PropTypes.bool,
	setIsModalVisible: PropTypes.func,
	isAddMode: PropTypes.bool,
	initialValue: PropTypes.object,
};
TopicModal.defaultProps = {
	isModalVisible: false,
	setIsModalVisible: null,
	isAddMode: true,
	initialValue: topicValues.initial,
};

export default TopicModal;
