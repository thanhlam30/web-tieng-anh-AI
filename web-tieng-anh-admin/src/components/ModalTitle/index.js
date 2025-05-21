import React from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const { Title } = Typography;

ModalTitle.propTypes = {
	title: PropTypes.string,
	icon: PropTypes.object,
};

ModalTitle.defaultProps = {
	title: "Thêm mới",
	icon: <PlusOutlined />,
};

function ModalTitle(props) {
	const { title, icon } = props;

	return (
		<Title level={4} className="common-color" style={{ color: "#007c7e" }}>
			{icon} &nbsp;
			{title.toUpperCase()}
		</Title>
	);
}

export default ModalTitle;
