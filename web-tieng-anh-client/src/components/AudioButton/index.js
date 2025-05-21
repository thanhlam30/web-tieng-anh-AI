import { SoundFilled, SoundOutlined } from "@ant-design/icons";
import { useDebounceFn } from "ahooks";
import { Button, Tooltip } from "antd";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import axios from "axios";

function AudioButton(props) {
	const { toolTip, audioUrl, audioUrls, color, title, size, audioName } = props;
	const [soundUrls, setSoundUrls] = useState([]);

	useEffect(() => {
		const fetchAudioUrls = async () => {
		  try {
			const wordParts = audioName.split(" ");
			const requests = wordParts.map((wordPart) =>
			  axios.get(`https://dict.laban.vn/ajax/getsound?accent=us&word=${wordPart}`)
			);
			const responses = await Promise.all(requests);
			const urls = responses.map((response) => response.data.data);
			setSoundUrls(urls); 
		  } catch (error) {
			console.error("Error fetching audio URLs:", error);
		  }
		};
	
		if (audioName) {
		  fetchAudioUrls(); 
		}
	  }, [audioName]); 


	

	const [isActive, setIsActive] = useState(false);
	// const [isActive, { toggle }] = useToggle();

	const style = { color: `${color}`, fontSize: `${size}px` };
	const handleOnClick = async () => {
		setIsActive(true);
		if (soundUrls.length > 0) {
		  let overlap = 200; // ms, overlap 200ms trước khi âm trước kết thúc
		  for (let i = 0; i < soundUrls.length; i++) {
			const audio = new Audio(soundUrls[i]);
			audio.play();
	  
			// Đợi duration trừ đi overlap (hoặc mặc định 1s nếu chưa load kịp)
			await new Promise((resolve) => {
			  audio.onloadedmetadata = () => {
				const waitTime = Math.max(0, audio.duration * 1000 - overlap);
				setTimeout(resolve, waitTime);
			  };
	  
			  // Nếu không load được metadata, fallback sau 1s
			  setTimeout(resolve, 1000 - overlap);
			});
		  }
		}
		setIsActive(false);
	  };

	const { run } = useDebounceFn(
		() => {
			handleOnClick();
		},
		{
			wait: 500,
		}
	);

	return (
		<Tooltip title={toolTip}>
			<Button
				type="link"
				onClick={run}
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
	audioUrls: PropTypes.array,
	audioName: PropTypes.string,
	color: PropTypes.string,
	title: PropTypes.string,
	size: PropTypes.number,
};

AudioButton.defaultProps = {
	toolTip: "Listen",
	audioUrl: "",
	color: "#4b91ff",
	title: "",
	size: 24,
};

export default AudioButton;
