import { EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, message, Row, Space, Spin } from "antd";
import Modal from "antd/lib/modal/Modal";
import { videoApi } from "api";
import ModalTitle from "components/ModalTitle";
import {
	ImageField,
	InputField,
	SelectedField,
	TextAreaField,
	UploadField,
} from "customfield";
import { videoValues } from "features/Video/initialAndValidateValues";
import { fetchVideos } from "features/Video/videoSlice";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function VideoModal(props) {
	const dispatch = useDispatch();
	const { videoCategories } = useSelector((state) => state.video);
	const { isModalVisible, setIsModalVisible, isAddMode, initialValue, query } =
		props;

	const levels = [1, 2, 3, 4, 5, 6, 7];

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleSubmit = async (values) => {
		const { id, image, video } = values;

		console.log({ video });

		const videoAdd = { ...values };
		delete videoAdd.image;
		delete videoAdd.video;

		let response;

		if (isAddMode) {
			response = await videoApi.addVideo(videoAdd);
		} else {
			response = await videoApi.updateVideo(id, videoAdd);
		}

		if (response.error) {
			const error = response.error;
			for (const property in error) {
				message.error(error[property]);
			}
		} else {
			const videoId = isAddMode ? response.id : id;

			if (image && typeof image === "object") {
				await videoApi.updateVideoImage(videoId, image);
			}

			if (video && typeof video === "object") {
				await videoApi.updateVideoFile(videoId, video);
				// .catch(function (error) {
				// 	if (error.response) {
				// 		console.log({ error });
				// 		console.log(error.response.data);
				// 		console.log(error.response.status);
				// 		console.log(error.response.headers);
				// 	}
				// });
			}

			message.success(`${isAddMode ? "Thêm" : "Cập nhật"} thành công`);
			handleCancel();
		}
		dispatch(fetchVideos(query));
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
					validationSchema={videoValues.validationSchema}
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
										title="Tên video"
										titleCol={6}
										maxLength={200}
										inputCol={18}
										isRequire={true}
									/>

									<FastField
										name="categoryId"
										component={SelectedField}
										title="Chủ đề"
										options={videoCategories.map((category) => ({
											key: category.id,
											value: category.name,
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
										name="level"
										component={SelectedField}
										title="Level"
										options={levels.map((level) => ({
											key: level,
											value: level,
										}))}
										titleCol={6}
										inputCol={18}
										isRequire={true}
									/>

									<FastField
										name="duration"
										component={InputField}
										title="Thời lượng video (giây)"
										titleCol={6}
										maxLength={200}
										inputCol={18}
										isRequire={true}
										type="number"
									/>

									<FastField
										name="video"
										component={UploadField}
										title="Video"
										titleCol={6}
										inputCol={18}
										// fileType="video/*"
										// fileType="audio/*,.mp3"
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
VideoModal.propTypes = {
	isModalVisible: PropTypes.bool,
	setIsModalVisible: PropTypes.func,
	isAddMode: PropTypes.bool,
	initialValue: PropTypes.object,
	query: PropTypes.object,
};

VideoModal.defaultProps = {
	isModalVisible: false,
	setIsModalVisible: null,
	isAddMode: true,
	initialValue: videoValues.initial,
	// initialValue: {
	// 	name: "",
	// 	topicSlug: "",
	// 	page: 0,
	// 	size: 10,
	// },
};
export default VideoModal;
