import { Checkbox, Empty, message, notification } from "antd";
import Modal from "antd/lib/modal/Modal";
import { addToWordNote } from "features/WordNote/wordNoteSlice";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function WordNoteModal(props) {
	const { isModalVisible, setIsModalVisible, wordNoteOptions, wordId } = props;
	const dispatch = useDispatch();
	const [selectedWordNote, setSelectedWordNote] = useState([]);
	const [checkAll, setCheckAll] = useState(false);

	function onChange(checkedValues) {
		setSelectedWordNote(checkedValues);
		setCheckAll(checkedValues.length === wordNoteOptions.length);
	}

	const onCheckAllChange = (e) => {
		const isChecked = e.target.checked;
		const values = wordNoteOptions.map((record) => record.value);
		setCheckAll(isChecked);
		setSelectedWordNote(isChecked ? values : []);
	};

	const handleCancelModal = () => {
		setIsModalVisible(false);
	};

	const openNotificationWithIcon = (type) => {
		notification[type]({
			message: "Warning",
			description: "Bạn cần phải chọn ít nhất 1 wordnote để thêm",
			style: { backgroundColor: "#ffeeb0" },
		});
	};

	const handleAddToWordNote = () => {
		if (selectedWordNote.length > 0) {
			for (const wordNoteId of selectedWordNote) {
				const wordNoteCategoryId = parseInt(wordNoteId);
				const value = {
					wordNoteCategoryId,
					wordId,
				};
				dispatch(addToWordNote({ value }));
			}

			setIsModalVisible(false);
			message.success("Đã thêm vào wordnote");
		} else {
			openNotificationWithIcon("warning");
		}
	};

	return (
		<Modal
			title={"Thêm từ vào wordnote"}
			centered
			visible={isModalVisible}
			onCancel={handleCancelModal}
			onOk={handleAddToWordNote}
			cancelText="Hủy"
			okText="Thêm"
		>
			{wordNoteOptions.length > 0 ? (
				<>
					<Checkbox onChange={onCheckAllChange} checked={checkAll}>
						Chọn tất cả
					</Checkbox>
					<Checkbox.Group
						options={wordNoteOptions}
						value={selectedWordNote}
						onChange={onChange}
					/>
				</>
			) : (
				<Empty
					description={
						<span>
							Bạn chưa có wordnote nào. <Link to="/wordnotes">Wordnote</Link>
						</span>
					}
				/>
			)}
		</Modal>
	);
}
WordNoteModal.propTypes = {
	isModalVisible: PropTypes.bool,
	setIsModalVisible: PropTypes.func,
	wordNoteOptions: PropTypes.array,
	wordId: PropTypes.number,
};
WordNoteModal.defaultProps = {
	isModalVisible: false,
	setIsModalVisible: null,
	wordNoteOptions: [],
	wordId: 1,
};

export default WordNoteModal;
