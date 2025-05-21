import { UpOutlined } from "@ant-design/icons";
import { BackTop, Tooltip } from "antd";
import React from "react";
import "./style.scss";

function BackToTopButton() {
	return (
		<Tooltip title="Back to top">
			<BackTop>
				<div className="back-top">
					<UpOutlined />
				</div>
			</BackTop>
		</Tooltip>
	);
}

export default BackToTopButton;
