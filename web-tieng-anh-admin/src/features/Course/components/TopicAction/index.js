import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Dropdown, Menu, message, Modal } from "antd";
import { deleteTopic, fetchTopics } from "features/Course/courseSlice";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import "./style.scss";

const { confirm } = Modal;

function TopicAction(props) {
	const { topic, setInitialValue, setIsModalVisible, setIsAddMode } = props;
	const dispatch = useDispatch();

	const handleUpdate = () => {
		setInitialValue(topic);
		setIsAddMode(false);
		setIsModalVisible(true);
	};

	const handleDelete = () => {
		confirm({
			content: "Bạn có muốn xóa chủ đề này không ?",
			async onOk() {
				try {
					unwrapResult(await dispatch(deleteTopic({ topicId: topic.id })));
					message.success(`Xóa thành công`);
					dispatch(fetchTopics());
				} catch (error) {
					message.error("Không thể xóa chủ đề này");
				}
			},
		});
	};

	const menu = (
		<Menu>
			<Menu.Item onClick={handleUpdate}>
				<div className="menu-adjust--center">
					<EditTwoTone twoToneColor="#ad8b00" />
					<span className="menu-title">Sửa</span>
				</div>
			</Menu.Item>

			<Menu.Divider />
			<Menu.Item onClick={handleDelete}>
				<div className="menu-adjust--center">
					<DeleteTwoTone twoToneColor="#a8071a" />
					<span className="menu-title">Xóa</span>
				</div>
			</Menu.Item>
		</Menu>
	);

	return (
		<Dropdown overlay={menu} placement="bottomLeft">
			<Button type="primary" ghost>
				Thao tác
			</Button>
		</Dropdown>
	);
}

TopicAction.propTypes = {
	topic: PropTypes.object,
	setInitialValue: PropTypes.func,
	setIsModalVisible: PropTypes.func,
	setIsAddMode: PropTypes.func,
};

TopicAction.defaultProps = {
	topic: {},
	setInitialValue: null,
	setIsModalVisible: null,
	setIsAddMode: null,
};

export default TopicAction;
