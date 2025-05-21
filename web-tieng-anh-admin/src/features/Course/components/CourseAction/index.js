import {
	DeleteTwoTone,
	EditTwoTone,
	ExclamationCircleOutlined,
	InfoCircleTwoTone,
} from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Dropdown, Menu, message, Modal } from "antd";
import { deleteCourse, fetchCourses } from "features/Course/courseSlice";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const { confirm, Text } = Modal;

function CourseAction(props) {
	const { course, setInitialValue, setIsModalVisible, setIsAddMode, query } =
		props;
	const history = useHistory();
	const dispatch = useDispatch();

	const handleOnDetailClick = () => {
		history.push(`/admin/courses/${course.slug}`);
	};

	const handleOnUpdateClick = () => {
		delete course.slug;
		setInitialValue(course);
		setIsAddMode(false);
		setIsModalVisible(true);
	};

	const handleOnDeleteClick = async () => {
		confirm({
			icon: <ExclamationCircleOutlined />,
			content: "Bạn có muốn xóa khóa học này không ?",
			async onOk() {
				try {
					unwrapResult(await dispatch(deleteCourse({ courseId: course.id })));
					message.success("Xóa thành công");
					dispatch(fetchCourses(query));
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
			<Menu.Item onClick={handleOnDetailClick}>
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

CourseAction.propTypes = {
	blogId: PropTypes.number,
	course: PropTypes.object,
	setInitialValue: PropTypes.func,
	setIsModalVisible: PropTypes.func,
	setIsAddMode: PropTypes.func,
};

CourseAction.defaultProps = {
	blogId: 0,
	course: {},
	setInitialValue: null,
	setIsModalVisible: null,
	setIsAddMode: null,
};

export default CourseAction;
