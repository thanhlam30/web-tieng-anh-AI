import { EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, message, Row, Space, Spin } from "antd";
import Modal from "antd/lib/modal/Modal";
import { subtitleApi } from "api";
import ModalTitle from "components/ModalTitle";
import { InputField } from "customfield";
import {
	subtitleValues,
	videoValues,
} from "features/Video/initialAndValidateValues";
import { fetchVideo } from "features/Video/videoSlice";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function SubtitleModal(props) {
	const dispatch = useDispatch();
	const { slug } = useParams();
	const {
		isModalVisible,
		setIsModalVisible,
		isAddMode,
		initialValue,
		videoId,
	} = props;

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleSubmit = async (values) => {
		const { id } = values;

		const subtitle = { ...values, videoId };

		let response;
		if (isAddMode) {
			response = await subtitleApi.addSubtitle(subtitle);
		} else {
			response = await subtitleApi.updateSubtitle(id, subtitle);
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

		dispatch(fetchVideo(slug));
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
			>
				<Formik
					initialValues={initialValue}
					validationSchema={subtitleValues.validationSchema}
					onSubmit={handleSubmit}
					enableReinitialize
				>
					{(formikProps) => {
						const { values, errors, touched, isSubmitting } = formikProps;
						console.log(values);
						return (
							<Form>
								<Space
									direction="vertical"
									size="middle"
									style={{ width: "100%" }}
								>
									<FastField component={InputField} name="id" type="hidden" />
									<FastField
										name="content"
										component={InputField}
										title="Nội dung"
										titleCol={6}
										maxLength={200}
										inputCol={18}
										isRequire={true}
									/>

									<FastField
										name="start"
										component={InputField}
										title="Bắt đầu"
										titleCol={6}
										maxLength={200}
										inputCol={18}
										isRequire={true}
										type="number"
									/>
									<FastField
										name="end"
										component={InputField}
										title="Kết thúc"
										titleCol={6}
										maxLength={200}
										inputCol={18}
										isRequire={true}
										type="number"
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
SubtitleModal.propTypes = {
	isModalVisible: PropTypes.bool,
	setIsModalVisible: PropTypes.func,
	isAddMode: PropTypes.bool,
	initialValue: PropTypes.object,
	videoId: PropTypes.number,
};

SubtitleModal.defaultProps = {
	isModalVisible: false,
	setIsModalVisible: null,
	isAddMode: true,
	initialValue: videoValues.initial,
	videoId: 0,
};
export default SubtitleModal;
