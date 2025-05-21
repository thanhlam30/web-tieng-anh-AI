import {
	DeleteTwoTone,
	EditTwoTone,
	ExclamationCircleOutlined,
	InfoCircleTwoTone,
} from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Dropdown, Menu, message, Modal } from "antd";
import courseApi from "api/courseApi";
import { deleteWord, fetchWordsByCourse } from "features/Course/courseSlice";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const { confirm, Text } = Modal;

function WordAction(props) {
	const { coursesDetail } = useSelector((state) => state.course);
	const {
		word,
		setInitialValue,
		setIsModalVisible,
		setIsAddMode,
		setIsDetailViewMode,
		query,
	} = props;
	const dispatch = useDispatch();

	const handleOnDetailViewClick = () => {
		setIsDetailViewMode(true);
		setInitialValue(word);
	};

	const handleOnUpdateClick = () => {
		setInitialValue(word);
		setIsAddMode(false);
		setIsModalVisible(true);
	};

	const handleOnDeleteClick = async () => {
		confirm({
			icon: <ExclamationCircleOutlined />,
			content: "Bạn có muốn xóa từ này không ?",
			async onOk() {
				try {
					await courseApi.deleteFromCourse(coursesDetail.id, word.id);
					unwrapResult(await dispatch(deleteWord({ wordId: word.id })));
					message.success("Xóa thành công");
					dispatch(fetchWordsByCourse(query));
				} catch (error) {
					message.error("Xóa thất bại");
				}
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	const menu = (
		<Menu>
			<Menu.Item onClick={handleOnDetailViewClick}>
				<div className="menu-adjust--center">
					<InfoCircleTwoTone />
					<span className="menu-title">Xem chi tiết</span>
				</div>
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item onClick={handleOnUpdateClick}>
				<div className="menu-adjust--center">
					<EditTwoTone twoToneColor="#ad8b00" />
					<span className="menu-title">Sửa</span>
				</div>
			</Menu.Item>

			<Menu.Divider />
			<Menu.Item onClick={handleOnDeleteClick}>
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

WordAction.propTypes = {
	word: PropTypes.object,
	setInitialValue: PropTypes.func,
	setIsModalVisible: PropTypes.func,
	setIsAddMode: PropTypes.func,
	setIsDetailViewMode: PropTypes.func,
};

WordAction.defaultProps = {
	word: {},
	setInitialValue: null,
	setIsModalVisible: null,
	setIsAddMode: null,
	setIsDetailViewMode: null,
};

export default WordAction;
