import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Dropdown, Menu, message, Modal } from "antd";
import {
	deleteVideoCategory,
	fetchVideoCategories,
} from "features/Video/videoSlice";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import "./style.scss";

const { confirm } = Modal;

function CategoryAction(props) {
	const { category, setInitialValue, setIsModalVisible, setIsAddMode } = props;
	const dispatch = useDispatch();

	const handleUpdate = () => {
		setInitialValue(category);
		setIsAddMode(false);
		setIsModalVisible(true);
	};

	const handleDelete = () => {
		confirm({
			content: "Bạn có muốn xóa danh mục này không ?",
			async onOk() {
				try {
					unwrapResult(
						await dispatch(deleteVideoCategory({ categoryId: category.id }))
					);
					message.success(`Xóa thành công`);
					dispatch(fetchVideoCategories());
				} catch (error) {
					message.error("Không thể xóa danh mục này");
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

CategoryAction.propTypes = {
	category: PropTypes.object,
	setInitialValue: PropTypes.func,
	setIsModalVisible: PropTypes.func,
	setIsAddMode: PropTypes.func,
};

CategoryAction.defaultProps = {
	category: {},
	setInitialValue: null,
	setIsModalVisible: null,
	setIsAddMode: null,
};

export default CategoryAction;
