import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Tooltip, Typography } from "antd";
import imageNotFound from "assets/images/image-not-found.svg";
import AudioButton from "components/AudioButton";
import ConfirmModal from "components/ConfirmModal";
import WordNoteModal from "features/WordNote/components/WordNoteModal";
import {
	deleteFromWordNote,
	getWordNoteDetail,
} from "features/WordNote/wordNoteSlice";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MeaningCard from "../MeaningCard";
import "./style.scss";

function WordCard(props) {
	const { word, wordNoteOptions, isWordNote, wordnoteId } = props;
	const { Title } = Typography;
	const { isLogin } = useSelector((state) => state.global);
	const dispatch = useDispatch();

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isConfirmVisible, setIsConfirmVisible] = useState(false);

	const handleDelete = async () => {
		await dispatch(deleteFromWordNote({ wordnoteId, wordId: word.id }));
		await dispatch(getWordNoteDetail(wordnoteId));
		setIsConfirmVisible(false);
	};

	const showModal = () => {
		if (isLogin) {
			setIsModalVisible(true);
		} else {
			Modal.warning({
				closable: true,
				maskClosable: true,
				centered: true,
				title: "Oops... Bạn cần phải đăng nhập để sử dụng chức năng này",
			});
		}
	};

	return (
		<>
			<div className="word-card">
				<div className="word-card__image">
					<img
						src={word.image}
						alt={word.name}
						onError={(e) => (e.target.src = imageNotFound)}
					/>
				</div>
				<div className="word-card__content">
					<div className="word-card-header">
						<div className="word-card-header__left">
							<Title level={2}>
								<Space>
									<AudioButton
										audioUrl={word.sound}
										audioName={word.name}
										audioUrls={["1","2"]}
										size={24}
										color={"#28a745"}
										toolTip="Nghe"
									/>
									<span className='word-name'>{word.name}</span>
								</Space>
							</Title>
						</div>
						<div className="word-card-header__right">
							<Tooltip title={isWordNote ? "Xóa" : "Thêm vào wordnote"}>
								<Button
									style={{ borderRadius: "50%" }}
									type={isWordNote ? "danger" : "primary"}
									icon={isWordNote ? <DeleteOutlined /> : <PlusOutlined />}
									size="middle"
									onClick={() => {
										isWordNote ? setIsConfirmVisible(true) : showModal();
									}}
								></Button>
							</Tooltip>
						</div>
					</div>
					<div className="pronunciation">
						{word.type} &nbsp;&nbsp;&nbsp;&nbsp; {word.pronounce}
					</div>

					<MeaningCard definition={word.definition} example={word.example} />
					<MeaningCard isTranslate={true} definition={word.mean} />
				</div>
			</div>
			{isWordNote ? (
				<ConfirmModal
					isModalVisible={isConfirmVisible}
					setIsModalVisible={setIsConfirmVisible}
					handleOnOk={handleDelete}
					content={"Bạn có chắc chắn muốn xóa từ này không?"}
					okText={"Đồng ý"}
					cancelText={"Hủy"}
				/>
			) : (
				<WordNoteModal
					isModalVisible={isModalVisible}
					setIsModalVisible={setIsModalVisible}
					wordNoteOptions={wordNoteOptions}
					wordId={word.id}
				/>
			)}
		</>
	);
}

WordCard.propTypes = {
	word: PropTypes.object,
	maxCharacterCount: PropTypes.number,
	wordNoteOptions: PropTypes.array,
	isWordNote: PropTypes.bool,
	wordnoteId: PropTypes.number,
};
WordCard.defaultProps = {
	word: {},
	maxCharacterCount: 140,
	wordNoteOptions: [],
	isWordNote: false,
	wordnoteId: 0,
};

export default WordCard;
