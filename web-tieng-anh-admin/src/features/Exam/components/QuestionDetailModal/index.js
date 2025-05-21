import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Image, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import ModalTitle from "components/ModalTitle";
import {
	paragraphValues,
	questionValues,
} from "features/Exam/initialAndValidateValues";
import PropTypes from "prop-types";
import React from "react";
import Text from "antd/lib/typography/Text";

function QuestionDetailModal(props) {
	const { isDetailViewMode, setIsDetailViewMode, question } = props;
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
			centered
			onCancel={handleCancel}
		>
			<Space direction="vertical" style={{ width: "100%" }} size="large">
				<div>
					{question?.audio && (
						<audio controls>
							<source src={question.audio} />
						</audio>
					)}
				</div>
				{question.content.startsWith("http") ? (
					<Image width={200} src={question.content} />
				) : (
					<Text>{question.content}</Text>
				)}
				<Space direction="vertical" style={{ width: "100%" }} size="small">
					<Text>A. {question.a}</Text>
					<Text>B. {question.b}</Text>
					<Text>C. {question.c}</Text>
					<Text>{question?.d && `D. ${question.d}`}</Text>
				</Space>
				<Text>Đáp án: {question.result}</Text>
				<Text>Giải thích: {question.extra}</Text>
			</Space>
		</Modal>
	);
}

QuestionDetailModal.propTypes = {
	isDetailViewMode: PropTypes.bool,
	setIsDetailViewMode: PropTypes.func,
	question: PropTypes.object,
};

QuestionDetailModal.defaultProps = {
	isDetailViewMode: false,
	setIsDetailViewMode: null,
	question: questionValues.initial,
};
export default QuestionDetailModal;
