import { EditOutlined } from "@ant-design/icons";
import { Checkbox, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import { userApi } from "api";
import ModalTitle from "components/ModalTitle";
import { ROLE_OPTIONS } from "features/User/constants";
import { fetchUsers } from "features/User/userSlice";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function UserRoleModal(props) {
	const dispatch = useDispatch();
	const { isUpdateUserRole, setIsUpdateUserRole, user, query } = props;
	const [checkAll, setCheckAll] = useState(false);
	const [selectedRole, setSelectedRole] = useState([]);

	const defaultValue = user.roles.filter((val) => !ROLE_OPTIONS.includes(val));

	const handleCancel = () => {
		setIsUpdateUserRole(false);
	};

	const onCheckAllChange = (e) => {
		const isChecked = e.target.checked;
		const values = ROLE_OPTIONS.map((record) => record.value);
		setCheckAll(isChecked);
		setSelectedRole(isChecked ? values : []);
	};

	const handleSubmit = async () => {
		await userApi
			.updateUserRoles(user.id, selectedRole)
			.then(() => {
				message.success("Cập nhật thành công");
				handleCancel();
				dispatch(fetchUsers(query));
			})
			.catch((error) => {
				const { response } = error;
				const { data } = response;
				message.error(data.error);
			});
	};
	function onChange(checkedValues) {
		setSelectedRole(checkedValues);
		setCheckAll(checkedValues.length === ROLE_OPTIONS.length);
	}

	return (
		<div id="blog-add-page">
			<Modal
				title={<ModalTitle title={"Cập nhật"} icon={<EditOutlined />} />}
				visible={isUpdateUserRole}
				onCancel={handleCancel}
				onOk={handleSubmit}
				cancelText="Hủy"
				okText="Lưu"
			>
				<Checkbox onChange={onCheckAllChange} checked={checkAll}>
					Chọn tất cả
				</Checkbox>
				<Checkbox.Group
					options={ROLE_OPTIONS}
					defaultValue={defaultValue}
					onChange={onChange}
				/>
			</Modal>
		</div>
	);
}
UserRoleModal.propTypes = {
	isUpdateUserRole: PropTypes.func,
	setIsUpdateUserRole: PropTypes.func,
	user: PropTypes.object,
	query: PropTypes.object,
};

UserRoleModal.defaultProps = {
	isUpdateUserRole: null,
	setIsUpdateUserRole: null,
	user: {},
	query: {
		username: "",
		page: 0,
		size: 10,
	},
};
export default UserRoleModal;
