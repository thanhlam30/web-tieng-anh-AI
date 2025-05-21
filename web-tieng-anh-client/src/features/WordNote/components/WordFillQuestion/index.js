import { faBackspace } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import "./style.scss";

function WordFillQuestion(props) {
	const { word, setUserAnswer } = props;
	const [wordIndexes, setWordIndexes] = useState([]);
	const [suggestions, setSuggestions] = useState([]);
	const [spaceClickedCount, setSpaceClickedCount] = useState(0);
	const numberOfSpaces = word.name.split(" ").length - 1;

	const alphabet = "abcdefghijklmnopqrstuvwxyz";

	const randomCharacter = () => {
		let newSuggestions = [...word.suggestions];
		while (newSuggestions.length <= 5) {
			const randomCharacter =
				alphabet[Math.floor(Math.random() * alphabet.length)];
			newSuggestions.push(randomCharacter);
		}

		const shuffledArr = () => newSuggestions.sort(() => 0.5 - Math.random());
		setSuggestions(shuffledArr);
	};

	const handleAnswer = (wordIndexes) => {
		const answer = Array.from(wordIndexes, (i) =>
			i === -1 ? " " : suggestions[i]
		).join("");

		setUserAnswer(answer);
	};

	const handleDeleteClick = () => {
		const lastItemIndex = wordIndexes.length - 1;
		const newWordIndexes = wordIndexes.slice(0, -1);

		wordIndexes[lastItemIndex] === -1 &&
			setSpaceClickedCount(spaceClickedCount - 1);

		setWordIndexes(newWordIndexes);
		handleAnswer(newWordIndexes);
	};

	const handleOnClick = (index) => {
		const newWordIndexes = [...wordIndexes, index];
		setWordIndexes(newWordIndexes);
		if (index === -1) {
			const newSpaceClickedCount = spaceClickedCount + 1;
			setSpaceClickedCount(newSpaceClickedCount);
		}

		handleAnswer(newWordIndexes);
	};

	useEffect(() => {
		setWordIndexes([]);
		setSpaceClickedCount(0);
		setUserAnswer("");
		randomCharacter();
	}, [word]);

	return (
		<div className="word-fill-question">
			<div className="word-fill-question__user-answer">
				<Row justify="center">
					<Col span={16} offset={4}>
						<Row className="dashed" justify="center" gutter={[8, 8]}>
							{wordIndexes.map((value, index) => (
								<Col key={index}>
									<div className={`btn btn--normal answer`}>
										{value === -1 ? <span>&#160;</span> : suggestions[value]}
									</div>
								</Col>
							))}
						</Row>
					</Col>
					<Col span={3} offset={1}>
						<button
							className={`btn btn--normal ${
								wordIndexes.length === 0 && "disable"
							}`}
							onClick={() => handleDeleteClick()}
							disabled={wordIndexes.length === 0 && true}
						>
							<FontAwesomeIcon icon={faBackspace} />
						</button>
					</Col>
				</Row>
			</div>

			<div className="word-fill-question__suggested-words">
				<Row justify="center">
					<Col span={16}>
						<Row justify="center" gutter={[8, 8]}>
							{suggestions.map((value, index) => (
								<Col key={index}>
									<button
										className={`btn btn--normal ${
											wordIndexes.includes(index) && "hide disable"
										}`}
										onClick={() => handleOnClick(index)}
										disabled={wordIndexes.includes(index) && true}
									>
										{value}
									</button>
								</Col>
							))}
						</Row>
						<Row justify="center">
							{numberOfSpaces > 0 && (
								<Col span={8}>
									<button
										className={`btn btn--normal ${
											spaceClickedCount >= numberOfSpaces && "disable hide"
										} space`}
										onClick={() => handleOnClick(-1)}
										disabled={spaceClickedCount === numberOfSpaces && true}
									>
										Space
									</button>
								</Col>
							)}
						</Row>
					</Col>
				</Row>
			</div>
		</div>
	);
}

WordFillQuestion.propTypes = {
	setUserAnswer: PropTypes.func,
	word: PropTypes.object,
};
WordFillQuestion.defaultProps = {
	setUserAnswer: null,
	word: {},
};
export default WordFillQuestion;
