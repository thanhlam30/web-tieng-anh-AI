import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip, Typography } from "antd";
import ConfirmModal from "components/ConfirmModal";
import {
	deleteWordNote,
	fetchWordNotes,
} from "features/WordNote/wordNoteSlice";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import WordNoteForm from "../WordNoteForm";
import "./style.scss";

function WordNoteCard(props) {
	const { Title } = Typography;
	const { wordNote, image } = props;

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isConfirmVisible, setIsConfirmVisible] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();
	const { url } = useRouteMatch();

	const style = {
		borderRadius: "50%",
	};

	const handleDelete = async () => {
		await dispatch(deleteWordNote({ id: wordNote.id }));
		await dispatch(fetchWordNotes());
	};

	function handleOnClick() {
		history.push({
			pathname: `${url}/${wordNote.id}`,
		});
	}

	return (
		<>
			<div className="word-note-card">
				<img src={image} alt="Oops... Not found" />
				<div className="word-note-card__overlay" onClick={handleOnClick}>
					<div className="word-note-card__content">
						<Title level={4}>
							<Space>
								<span>{wordNote.name}</span>
							</Space>
						</Title>
						<div>{wordNote.createDate}</div>
						<div>{wordNote.wordNumber} words</div>
					</div>
					<div className="word-note-card__action">
						<Space wrap align="center">
							<Tooltip title="Xóa">
								<Button
									style={style}
									type="danger"
									icon={<DeleteOutlined />}
									size="middle"
									onClick={(e) => {
										e.stopPropagation();
										setIsConfirmVisible(true);
									}}
								></Button>
							</Tooltip>

							<Tooltip title="Đổi tên">
								<Button
									style={style}
									type="primary"
									icon={<EditOutlined />}
									size="middle"
									onClick={(e) => {
										e.stopPropagation();
										setIsModalVisible(true);
									}}
								></Button>
							</Tooltip>
						</Space>
					</div>
				</div>
			</div>
			<WordNoteForm
				isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible}
				isAddMode={false}
				wordNote={wordNote}
			/>
			<ConfirmModal
				isModalVisible={isConfirmVisible}
				setIsModalVisible={setIsConfirmVisible}
				handleOnOk={handleDelete}
				content={`Bạn có chắc chắn muốn xóa wordnote này không?`}
				okText="Đồng ý"
				cancelText="Hủy"
			/>
		</>
	);
}

WordNoteCard.propTypes = {
	wordNote: PropTypes.object,
	image: PropTypes.string,
};
WordNoteCard.defaultProps = {
	wordNote: {},
	image: "",
};
export default WordNoteCard;
