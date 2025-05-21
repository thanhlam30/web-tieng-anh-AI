import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Pagination, Row, Space } from "antd";
import UserModal from "features/User/components/UserModal";
import UserRoleModal from "features/User/components/UserRoleModal";
import UserSearch from "features/User/components/UserSearch";
import UserTable from "features/User/components/UserTable";
import { userValues } from "features/User/initialAndValidateValues";
import { fetchUsers } from "features/User/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import commonFuc from "utils/commonFuc";

MainPage.propTypes = {};

function MainPage(props) {
	const dispatch = useDispatch();
	const { usersPage } = useSelector((state) => state.user);
	const { data, page, totalPages } = usersPage;

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isUpdateUserRole, setIsUpdateUserRole] = useState(false);
	const [user, setUser] = useState({});

	const [query, setQuery] = useState({
		username: "",
		page: 0,
		size: 10,
	});

	const handleOnClick = () => {
		setIsModalVisible(true);
	};

	const handleSearchChange = (username) => {
		setQuery({ page: 0, size: 10, username });
	};

	const handlePageChange = (page, pageSize) => {
		setQuery({ ...query, page: page - 1 });
	};

	useEffect(() => {
		dispatch(fetchUsers(query));
	}, [query]);

	return (
		<div id="user-main-page">
			<Row justify="space-between" gutter={[8, 8]}>
				<Col xs={24} sm={24} md={24} lg={4} xl={4}>
					<Button
						type="primary"
						onClick={handleOnClick}
						icon={<PlusCircleOutlined />}
					>
						Thêm người dùng
					</Button>
				</Col>
				<UserSearch onChange={handleSearchChange} />
			</Row>

			<Space direction="vertical" style={{ width: "100%" }}>
				<div className="course-main-page__table">
					<UserTable
						users={commonFuc.addSTTForList(data, query.page * query.size)}
						setIsUpdateUserRole={setIsUpdateUserRole}
						setUser={setUser}
						query={query}
					/>
				</div>
				<div style={{ textAlign: "right" }}>
					<Pagination
						current={page + 1}
						total={totalPages * 10}
						onChange={handlePageChange}
						showSizeChanger={false}
					/>
				</div>
			</Space>

			{isModalVisible && (
				<UserModal
					isModalVisible={isModalVisible}
					setIsModalVisible={setIsModalVisible}
					query={query}
				/>
			)}
			{isUpdateUserRole && (
				<UserRoleModal
					isUpdateUserRole={isUpdateUserRole}
					setIsUpdateUserRole={setIsUpdateUserRole}
					user={user}
					query={query}
				/>
			)}
		</div>
	);
}

export default MainPage;
