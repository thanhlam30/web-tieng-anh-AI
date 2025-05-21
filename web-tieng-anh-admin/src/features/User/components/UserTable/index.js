import { Table, Tag } from "antd";
import Column from "antd/lib/table/Column";
import PropTypes from "prop-types";
import React from "react";
import UserAction from "../UserAction";

function UserTable(props) {
	const { users, query, setIsUpdateUserRole, setUser } = props;

	const handleRoleName = (roleName) =>
		roleName.replaceAll("ROLE_", "").toLowerCase();

	return (
		<Table dataSource={users} pagination={false}>
			<Column
				align="center"
				width="60px"
				title="STT"
				dataIndex="stt"
				key="stt"
			/>
			<Column title="Tên" dataIndex="name" key="name" />
			<Column title="Tài khoản" dataIndex="username" key="username" />

			<Column
				title="Quyền"
				key="roles"
				render={(_, record) => {
					return record.roles.map((role, index) => {
						const roleName = handleRoleName(role);
						return (
							<Tag
								key={index}
								color={
									roleName === "admin"
										? "magenta"
										: roleName === "user"
										? "green"
										: "cyan"
								}
							>
								{roleName}
							</Tag>
						);
					});
				}}
			/>
			<Column
				key="action"
				align="center"
				render={(_, record, index) => {
					return (
						<UserAction
							user={record}
							query={query}
							setIsUpdateUserRole={setIsUpdateUserRole}
							setUser={setUser}
						/>
					);
				}}
			/>
		</Table>
	);
}

UserTable.propTypes = {
	users: PropTypes.array,
	query: PropTypes.object,
	setIsUpdateUserRole: PropTypes.func,
	setUser: PropTypes.func,
};

UserTable.defaultProps = {
	users: [],
	query: {},
	setIsUpdateUserRole: null,
	setUser: null,
};

export default UserTable;
