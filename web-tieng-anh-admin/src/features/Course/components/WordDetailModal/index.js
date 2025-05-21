import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import Title from "antd/lib/typography/Title";
import imageNotFound from "assets/images/image-not-found.svg";
import AudioButton from "components/AudioButton";
import ModalTitle from "components/ModalTitle";
import { wordValues } from "features/Course/initialAndValidateValues";
import PropTypes from "prop-types";
import React from "react";
import MeaningCard from "../MeaningCard";
import "./style.scss";

function WordDetailModal(props) {
	const { isDetailViewMode, setIsDetailViewMode, word } = props;

	const handleCancel = () => {
		setIsDetailViewMode(false);
	};

	return (
		<Modal
			title={<ModalTitle title="Xem chi tiết" icon={<InfoCircleOutlined />} />}
			visible={isDetailViewMode}
			footer={
				<Button style={{ marginRight: "8px" }} onClick={handleCancel}>
					Thoát
				</Button>
			}
			onCancel={handleCancel}
		>
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
										color={"#28a745"}
										toolTip="Nghe"
									/>
									<span>{word.name}</span>
								</Space>
							</Title>
						</div>
					</div>
					<div className="pronunciation">
						{word.type} &nbsp;&nbsp;&nbsp;&nbsp; {word.pronounce}
					</div>

					<MeaningCard definition={word.definition} example={word.example} />
					<MeaningCard isTranslate={true} definition={word.mean} />
				</div>
			</div>
		</Modal>
	);
}
WordDetailModal.propTypes = {
	isDetailViewMode: PropTypes.bool,
	setIsDetailViewMode: PropTypes.func,
	word: PropTypes.object,
};

WordDetailModal.defaultProps = {
	isDetailViewMode: false,
	setIsDetailViewMode: null,
	word: wordValues.initial,
};
export default WordDetailModal;
