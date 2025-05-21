import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Col, message, Row, Space, Spin } from "antd";
import Modal from "antd/lib/modal/Modal";
import { questionApi } from "api";
import ModalTitle from "components/ModalTitle";
import { ImageField, InputField, UploadField } from "customfield";
import { fetchQuestions } from "features/Exam/examSlice";
import { useQuery } from "features/Exam/hooks";
import { questionValues } from "features/Exam/initialAndValidateValues";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";

function QuestionModal(props) {
	const { isModalVisible, setIsModalVisible, initialValue } = props;

	const query = useQuery();
	const examId = query.get("examId");
	const part = +query.get("part");

	const dispatch = useDispatch();

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleSubmit = async (values) => {
		const { id, content, audio = "" } = values;
		let question = { ...values };

		if (part === 1) {
			question = { ...values, content: "null" };
		}

		if (part === 1 || part === 2) delete question.audio;

		const response = await questionApi.updateQuestion(id, question);

		if (response.error) {
			const error = response.error;
			for (const property in error) {
				message.error(error[property]);
			}
		} else {
			if (part === 1) {
				if (content && typeof content === "object")
					await questionApi.updateQuestionImage(id, content);
			}
			if (part === 1 || part === 2) {
				if (audio && typeof audio === "object")
					await questionApi.updateQuestionAudio(id, audio);
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
					validationSchema={questionValues.validationSchema}
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
									{part > 1 && (
										<FastField
											name="content"
											component={InputField}
											title="Câu hỏi"
											titleCol={6}
											maxLength={200}
											inputCol={18}
											isRequire={true}
										/>
									)}

									<FastField
										name="a"
										component={InputField}
										title="A"
										titleCol={6}
										maxLength={200}
										inputCol={18}
										isRequire={true}
									/>
									<FastField
										name="b"
										component={InputField}
										title="B"
										titleCol={6}
										maxLength={200}
										inputCol={18}
										isRequire={true}
									/>
									<FastField
										name="c"
										component={InputField}
										title="C"
										titleCol={6}
										maxLength={200}
										inputCol={18}
										isRequire={true}
									/>
									<FastField
										name="d"
										component={InputField}
										title="D"
										titleCol={6}
										maxLength={200}
										inputCol={18}
										isRequire={true}
									/>
									<FastField
										name="result"
										component={InputField}
										title="Đáp án"
										titleCol={6}
										maxLength={200}
										inputCol={18}
										isRequire={true}
									/>
									<FastField
										name="extra"
										component={InputField}
										title="Giải thích"
										titleCol={6}
										maxLength={200}
										inputCol={18}
									/>

									{[1, 2].includes(part) && (
										<FastField
											name="audio"
											component={UploadField}
											title="Audio"
											titleCol={6}
											inputCol={18}
											fileType="audio/*"
										/>
									)}

									{part === 1 && (
										<FastField
											name="content"
											component={ImageField}
											title="Hình ảnh"
											titleCol={6}
											maxLength={200}
											inputCol={18}
											isRequire={true}
										/>
									)}
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
QuestionModal.propTypes = {
	isModalVisible: PropTypes.bool,
	setIsModalVisible: PropTypes.func,
	initialValue: PropTypes.object,
};

QuestionModal.defaultProps = {
	isModalVisible: false,
	setIsModalVisible: null,
	initialValue: questionValues.initial,
};
export default QuestionModal;
