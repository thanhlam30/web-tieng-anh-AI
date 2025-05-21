import { EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, message, Row, Space, Spin } from "antd";
import Modal from "antd/lib/modal/Modal";
import { videoWordApi } from "api";
import ModalTitle from "components/ModalTitle";
import { InputField, UploadField } from "customfield";
import { videoWordValues } from "features/Video/initialAndValidateValues";
import { fetchVideo } from "features/Video/videoSlice";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function VideoWordModal(props) {
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
		const { id, sound } = values;

		const videoWord = { ...values, videoId };
		delete videoWord.sound;

		let response;
		if (isAddMode) {
			response = await videoWordApi.addVideoWord(videoWord);
		} else {
			response = await videoWordApi.updateVideoWord(id, videoWord);
		}

		if (response.error) {
			const error = response.error;
			for (const property in error) {
				message.error(error[property]);
			}
		} else {
			const videoWordId = isAddMode ? response.id : id;

			if (sound && typeof sound === "object") {
				await videoWordApi.updateVideoWordSound(videoWordId, sound);
			}
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
					validationSchema={videoWordValues.validationSchema}
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
										name="name"
										component={InputField}
										title="Từ vựng"
										titleCol={6}
										maxLength={200}
										inputCol={18}
										isRequire={true}
									/>
									<FastField
										name="origin"
										component={InputField}
										title="Từ gốc"
										titleCol={6}
										maxLength={200}
										inputCol={18}
										isRequire={true}
									/>

									<FastField
										name="frequency"
										component={InputField}
										title="Phổ biến"
										titleCol={6}
										maxLength={200}
										inputCol={18}
										isRequire={true}
										type="number"
									/>

									<FastField
										name="sound"
										component={UploadField}
										title="Audio"
										titleCol={6}
										inputCol={18}
										fileType="audio/*"
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
VideoWordModal.propTypes = {
	isModalVisible: PropTypes.bool,
	setIsModalVisible: PropTypes.func,
	isAddMode: PropTypes.bool,
	initialValue: PropTypes.object,
	videoId: PropTypes.number,
};

VideoWordModal.defaultProps = {
	isModalVisible: false,
	setIsModalVisible: null,
	isAddMode: true,
	initialValue: videoWordValues.initial,
	videoId: 0,
};
export default VideoWordModal;
