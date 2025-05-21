import { WarningFilled } from "@ant-design/icons";
import { Col, Modal, Row } from "antd";
import Title from "antd/lib/typography/Title";
import PropTypes from "prop-types";
import React from "react";

function ConfirmModal(props) {
	const {
		title,
		handleOnOk,
		okText,
		cancelText,
		content,
		isModalVisible,
		setIsModalVisible,
		contentSize,
		icon,
		width,
	} = props;
	const handleCancelModal = () => {
		setIsModalVisible(false);
	};
	return (
		<Modal
			title={title}
			centered
			visible={isModalVisible}
			onCancel={handleCancelModal}
			onOk={handleOnOk}
			cancelText={cancelText}
			okText={okText}
			width={width}
		>
			<Row justify="center">
				<Col>{icon}</Col>
			</Row>
			<Row justify="center">
				<Col>
					<Title level={contentSize}>{content}</Title>
				</Col>
			</Row>
		</Modal>
	);
}

ConfirmModal.propTypes = {
	title: PropTypes.string,
	handleOnOk: PropTypes.func,
	okText: PropTypes.string,
	cancelText: PropTypes.string,
	content: PropTypes.string,
	isModalVisible: PropTypes.bool,
	setIsModalVisible: PropTypes.func,
	contentSize: PropTypes.number,
	icon: PropTypes.object,
	width: PropTypes.number,
};
ConfirmModal.defaultProps = {
	title: "",
	handleOnOk: null,
	okText: "Ok",
	cancelText: "Cancel",
	content: "Are you sure?",
	isModalVisible: false,
	setIsModalVisible: null,
	contentSize: 4,
	icon: <WarningFilled style={{ fontSize: "68px", color: "#faad14" }} />,
	with: 300,
};
export default ConfirmModal;
