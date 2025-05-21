import { LeftCircleFilled, LeftCircleOutlined } from "@ant-design/icons";
import { useHover } from "ahooks";
import { Tooltip } from "antd";
import Title from "antd/lib/typography/Title";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import { useHistory } from "react-router-dom";

function GoBackButton(props) {
	const { href, tooltip } = props;

	const ref = useRef();
	const isHovering = useHover(ref);

	const history = useHistory();

	const handleGoBack = () => {
		history.push(href);
	};
	return (
		<Title>
			<Tooltip title={tooltip}>
				<span ref={ref}>
					{isHovering ? (
						<LeftCircleFilled onClick={handleGoBack} />
					) : (
						<LeftCircleOutlined />
					)}
				</span>
			</Tooltip>
		</Title>
	);
}
GoBackButton.propTypes = {
	href: PropTypes.string,
	tooltip: PropTypes.string,
};
GoBackButton.defaultProps = {
	href: "/",
	tooltip: "Go back",
};

export default GoBackButton;
