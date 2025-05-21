import { SoundFilled, SoundOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";

function AudioButton(props) {
	const { toolTip, audioUrl, color, title, size } = props;

	const [isActive, setIsActive] = useState(false);

	const style = { color: `${color}`, fontSize: `${size}px` };

	function handleOnClick() {
		setIsActive(true);
		if (typeof audioUrl === "string" && audioUrl?.length > 0) {
			const sound = new Audio(audioUrl);
			sound.play();
			sound.onended = () => {
				setIsActive(false);
			};
		} else {
			setTimeout(() => {
				setIsActive(false);
			}, 1000);
		}
	}

	return (
		<Tooltip title={toolTip}>
			<Button
				type="link"
				onClick={handleOnClick}
				icon={
					isActive ? (
						<SoundFilled style={style} />
					) : (
						<SoundOutlined style={style} />
					)
				}
				size={size}
			>
				{title}
			</Button>
		</Tooltip>
	);
}

AudioButton.propTypes = {
	toolTip: PropTypes.string,
	audioUrl: PropTypes.string,
	color: PropTypes.string,
	title: PropTypes.string,
	size: PropTypes.number,
};

AudioButton.defaultProps = {
	toolTip: "Listen",
	audioUrl: "",
	color: "#1890ff",
	title: "",
	size: 24,
};

export default AudioButton;
