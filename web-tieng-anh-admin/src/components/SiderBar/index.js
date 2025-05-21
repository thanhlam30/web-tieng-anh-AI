import {
	AppstoreAddOutlined,
	BookOutlined,
	CarryOutOutlined,
	DashboardOutlined,
	ReadOutlined,
	UnorderedListOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
SiderBar.propTypes = {};

const { Sider } = Layout;
const { SubMenu } = Menu;

const ADMIN_URL = "/admin";

const renderCourseMenu = () => {
	return (
		<SubMenu key="course" icon={<BookOutlined />} title="Quản lý khóa học">
			<Menu.Item key="course1" icon={<UnorderedListOutlined />}>
				<Link to={`${ADMIN_URL}/courses`}>Khóa học</Link>
			</Menu.Item>

			<Menu.Item key="course2" icon={<UnorderedListOutlined />}>
				<Link to={`${ADMIN_URL}/courses/topics`}>Chủ đề</Link>
			</Menu.Item>
		</SubMenu>
	);
};
const renderVideoMenu = () => {
	return (
		<SubMenu key="video" icon={<VideoCameraOutlined />} title="Quản lý Video">
			<Menu.Item key="video-1" icon={<UnorderedListOutlined />}>
				<Link to={`${ADMIN_URL}/videos`}>Video</Link>
			</Menu.Item>

			<Menu.Item key="video-2" icon={<UnorderedListOutlined />}>
				<Link to={`${ADMIN_URL}/videos/categories`}>Danh mục</Link>
			</Menu.Item>
		</SubMenu>
	);
};

function SiderBar(props) {
	const { name, roles } = useSelector((state) => state.global);
	const [collapsed, setCollapsed] = useState(false);

	const onCollapse = (collapsed) => {
		setCollapsed(collapsed);
	};

	const renderMenu = () => {
		const menus = [
			<Menu.Item key="1" icon={<DashboardOutlined />}>
				<Link to={ADMIN_URL}>Trang chủ</Link>
			</Menu.Item>,
		];

		roles.forEach((roleEle) => {

			if (roleEle === "ROLE_COURSE") menus.push(renderCourseMenu());

			if (roleEle === "ROLE_EXAM")
				menus.push(
					<Menu.Item key="3" icon={<CarryOutOutlined />}>
						<Link to={`${ADMIN_URL}/exams`}>Quản lý bài thi</Link>
					</Menu.Item>
				);
			if (roleEle === "ROLE_VIDEO") menus.push(renderVideoMenu());
		});

		return menus;
	};

	const checkAdminRole = () => {
		const index = roles.findIndex((roleEle) => roleEle === "ROLE_ADMIN");

		return index !== -1;
	};

	return (
		<Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
			<div className="logo">{name}</div>
			<Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
				{checkAdminRole() ? (
					<>
						<Menu.Item key="1" icon={<DashboardOutlined />}>
							<Link to={ADMIN_URL}>Trang chủ</Link>
						</Menu.Item>
						{renderCourseMenu()}
						{renderVideoMenu()}
						<Menu.Item key="6" icon={<CarryOutOutlined />}>
							<Link to={`${ADMIN_URL}/books`}>Quản lý bộ đề</Link>
						</Menu.Item>
						<Menu.Item key="3" icon={<CarryOutOutlined />}>
							<Link to={`${ADMIN_URL}/exams`}>Quản lý đề thi</Link>
						</Menu.Item>
						<Menu.Item key="5" icon={<UserOutlined />}>
							<Link to={`${ADMIN_URL}/users`}>Quản lý người dùng</Link>
						</Menu.Item>{" "}
					</>
				) : (
					renderMenu()
				)}
			</Menu>
		</Sider>
	);
}

export default SiderBar;
