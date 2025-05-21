import {
	DeleteTwoTone,
	EditTwoTone,
	ExclamationCircleOutlined,
	InfoCircleTwoTone,
} from "@ant-design/icons";
import { Button, Dropdown, Menu, message, Modal } from "antd";
import { userApi } from "api";
import { fetchUsers } from "features/User/userSlice";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";

const { confirm, Text } = Modal;

function UserAction(props) {
	const { user, query, setIsUpdateUserRole, setUser } = props;
	const dispatch = useDispatch();

	const handleOnUpdateRoleClick = () => {
		setIsUpdateUserRole(true);
		setUser(user);
	};

	const handleOnAdminRoleClick = async () => {
		confirm({
			icon: <ExclamationCircleOutlined />,
			content: "Bạn có muốn đặt quyền admin cho người dùng này?",
			async onOk() {
				await userApi
					.updateAdminRole(user.id)
					.then(() => {
						message.success("Đặt quyền admin thành công");
						dispatch(fetchUsers(query));
					})
					.catch(() => message.error("Đặt quyền admin thất bại"));
			},
		});
	};
	const handleOnDeleteClick = async () => {
		confirm({
			icon: <ExclamationCircleOutlined />,
			content: "Bạn có muốn xóa nguời dùng này không ?",
			async onOk() {
				await userApi
					.deleteUser(user.id)
					.then(() => {
						message.success("Xóa thành công");
						dispatch(fetchUsers(query));
					})
					.catch(() => message.error("Xóa thất bại"));
			},
		});
	};

	const menu = (
		<Menu>
			{/* <Menu.Item onClick={handleOnUpdateRoleClick}>
				<div className="menu-adjust--center">
					<EditTwoTone twoToneColor="#ad8b00" />
					<span className="menu-title">Thêm quyền</span>
				</div>
			</Menu.Item> */}
			<Menu.Divider />
			<Menu.Item onClick={handleOnAdminRoleClick}>
				<div className="menu-adjust--center">
					<InfoCircleTwoTone />
					<span className="menu-title">Đặt quyền Admin</span>
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

UserAction.propTypes = {
	setIsModalVisible: PropTypes.func,
	setIsUpdateUserRole: PropTypes.func,
	setUser: PropTypes.func,
};

UserAction.defaultProps = {
	setIsModalVisible: null,
	setIsUpdateUserRole: PropTypes.func,
	setUser: PropTypes.func,
};

export default UserAction;
