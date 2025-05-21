import { AudioOutlined, PauseCircleOutlined } from "@ant-design/icons";
import { message, Tooltip } from "antd";
import Search from "antd/lib/input/Search";
import ignoreSound from "assets/medias/ignore-sound.mp3";
import listenSound from "assets/medias/listen-sound.mp3";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";

function SearchBar(props) {
	const { handleOnClick } = props;

	const [wordToTranslate, setWordToTranslate] = useState("");

	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition,
	} = useSpeechRecognition();

	const onSearch = (value) => {
		if (handleOnClick) {
			if (value.length > 0) {
				handleOnClick(value);
			}
		} else {
			message.error("An error has occurred");
		}
	};

	const handleOnChange = (e) => setWordToTranslate(e.target.value);

	let audio;
	const playAudio = (url) => {
		if (audio) audio.pause();
		audio = new Audio(url);
		audio.load();
		audio.play();
	};

	const handleStartListen = () => {
		if (!browserSupportsSpeechRecognition) {
			message.error("Browser doesn't support speech recognition.");
		} else {
			playAudio(listenSound);
			resetTranscript();
			SpeechRecognition.startListening();
		}
	};

	const handleStopListen = () => {
		playAudio(ignoreSound);
		SpeechRecognition.stopListening();
	};

	const style = {
		fontSize: 16,
		color: "#4b91ff",
	};

	const suffix = (
		<Tooltip title={listening ? "Dừng" : "Tra từ bằng giọng nói"}>
			{listening ? (
				<PauseCircleOutlined onClick={handleStopListen} style={style} />
			) : (
				<AudioOutlined onClick={handleStartListen} style={style} />
			)}
		</Tooltip>
	);

	useEffect(() => {
		setWordToTranslate(transcript);
	}, [listening]);

	return (
		<Search
			placeholder="Từ điển Anh - Việt"
			enterButton="&nbsp;&nbsp;Tra từ&nbsp;&nbsp;"
			size="large"
			suffix={suffix}
			onSearch={onSearch}
			value={wordToTranslate}
			className="search-box"
			onChange={handleOnChange}
		/>
	);
}

SearchBar.propTypes = { handleOnClick: PropTypes.func };
SearchBar.defaultProps = { handleOnClick: null };

export default SearchBar;
