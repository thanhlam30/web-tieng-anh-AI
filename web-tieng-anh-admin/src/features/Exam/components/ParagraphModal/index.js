import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Col, message, Row, Space, Spin } from "antd";
import Modal from "antd/lib/modal/Modal";
import { paragraphApi } from "api";
import ModalTitle from "components/ModalTitle";
import { EditorField, ImageField, InputField, UploadField } from "customfield";
import { fetchQuestions } from "features/Exam/examSlice";
import { useQuery } from "features/Exam/hooks";
import { paragraphValues } from "features/Exam/initialAndValidateValues";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";

function ParagraphModal(props) {
	const { isModalVisible, setIsModalVisible, initialValue } = props;

	const query = useQuery();
	const examId = query.get("examId");
	const part = +query.get("part");

	const dispatch = useDispatch();

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleSubmit = async (values) => {
		console.log(initialValue);
		const { id, content, transcript, image } = values;
		let paragraph = { content, transcript };

		if (part === 3 || part === 4) {
			paragraph = { transcript, content: "null" };
			delete paragraph.audio;
		}

		const response = await paragraphApi.updateParagraph(id, paragraph);

		if (response.error) {
			const error = response.error;
			for (const property in error) {
				message.error(error[property]);
			}
		} else {
			if (image && typeof image === "object")
				await paragraphApi.updateParagraphImage(id, image);

			if (part === 3 || part === 4) {
				if (content && typeof content === "object")
					await paragraphApi.updateParagraphAudio(id, content);
			}

			message.success("Cập nhật thành công");
			handleCancel();
		}
		dispatch(fetchQuestions({ examId, type: part }));
	};

	return (
		<div id="blog-add-page">
			<Modal
				title={<ModalTitle title="Cập nhật" icon={<EditOutlined />} />}
				visible={isModalVisible}
				footer={null}
				onCancel={handleCancel}
				width={1000}
				centered
			>
				<Formik
					initialValues={initialValue}
					validationSchema={paragraphValues.validationSchema}
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

									{[3, 4].includes(part) ? (
										<FastField
											name="content"
											component={UploadField}
											title="Audio"
											titleCol={6}
											inputCol={18}
											fileType="audio/*"
											isRequire={true}
										/>
									) : (
										<FastField
											name="content"
											component={EditorField}
											title="Nội dung"
											titleCol={6}
											maxLength={200}
											inputCol={18}
											isRequire={true}
										/>
									)}

									<FastField
										name="transcript"
										component={EditorField}
										title="Bản dịch"
										titleCol={6}
										maxLength={200}
										inputCol={18}
									/>

									<FastField
										name="image"
										component={ImageField}
										title="Hình ảnh"
										titleCol={6}
										maxLength={200}
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
												Lưu
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
ParagraphModal.propTypes = {
	isModalVisible: PropTypes.bool,
	setIsModalVisible: PropTypes.func,
	initialValue: PropTypes.object,
};

ParagraphModal.defaultProps = {
	isModalVisible: false,
	setIsModalVisible: null,
	initialValue: paragraphValues.initial,
};
export default ParagraphModal;
