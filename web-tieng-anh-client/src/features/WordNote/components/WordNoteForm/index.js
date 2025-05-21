import { Button, Col, Row, Space, Spin } from "antd";
import Modal from "antd/lib/modal/Modal";
import InputField from "customfield/InputField";
import {
	addNewWordNote,
	fetchWordNotes,
	updateWordNote,
} from "features/WordNote/wordNoteSlice";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

function WordNoteForm(props) {
	const { isModalVisible, setIsModalVisible, isAddMode, wordNote } = props;
	const dispatch = useDispatch();

	const validationSchema = Yup.object().shape({
		name: Yup.string()
			.required("Không được bỏ trống")
			.max(20, "Tối đa 20 kí tự"),
	});

	const handleCancelModal = () => {
		setIsModalVisible(false);
	};

	const handleSubmit = async (values, { resetForm }) => {
		console.log("Submit:", values);
		isAddMode
			? await dispatch(addNewWordNote({ values }))
			: await dispatch(updateWordNote({ values }));
		await dispatch(fetchWordNotes());
		handleCancelModal();
		isAddMode && resetForm();
	};

	return (
		<Modal
			title={isAddMode ? "Thêm wordnote" : "Đổi tên"}
			centered
			visible={isModalVisible}
			footer={null}
			onCancel={handleCancelModal}
			width={"25vw"}
		>
			<Formik
				initialValues={wordNote}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{(formikProps) => {
					const { isSubmitting } = formikProps;
					return (
						<Form>
							<FastField component={InputField} name="id" type="hidden" />
							<FastField
								component={InputField}
								name="name"
								title="Tên"
								placeholder="Vd: Phrasebook ..."
								titleCol={6}
								inputCol={18}
							/>

							<Row justify="end" style={{ marginTop: "20px" }}>
								<Col>
									<Space size="middle">
										<Button onClick={handleCancelModal}>Hủy</Button>

										<Button htmlType="submit" type="primary">
											{isSubmitting && <Spin />}
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
WordNoteForm.propTypes = {
	isModalVisible: PropTypes.bool,
	setIsModalVisible: PropTypes.func,
	isAddMode: PropTypes.bool,
	wordNote: PropTypes.object,
};
WordNoteForm.defaultProps = {
	isModalVisible: false,
	setIsModalVisible: null,
	isAddMode: true,
	wordNote: { id: 0, name: "" },
};

export default WordNoteForm;
