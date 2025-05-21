import { Button, Col, Row } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import "./style.scss";

function QuizQuestion(props) {
	const { word, setUserAnswer } = props;
	const answerLabel = ["A", "B", "C", "D"];
	const [selectedAnswer, setSelectedAnswer] = useState(null);

	useEffect(() => {
		setSelectedAnswer(null);
	}, [word]);

	const handleOnClick = (index) => {
		const userAnswer = word.suggestions[index];
		setUserAnswer(userAnswer);
		setSelectedAnswer(index);
	};
	return (
		<div className="quiz-question-container">
			<Row justify="center" gutter={[24, 24]}>
				{word.suggestions.map((value, index) => (
					<Col xs={24} sm={24} md={12} lg={12} xl={12} key={index}>
						<Button
							shape="round"
							size="large"
							type={selectedAnswer === index ? "primary" : "default"}
							onClick={() => handleOnClick(index)}
						>{`${answerLabel[index]}. ${value}`}</Button>
					</Col>
				))}
			</Row>
		</div>
	);
}
QuizQuestion.propTypes = {
	setUserAnswer: PropTypes.func,
	word: PropTypes.object,
};
QuizQuestion.defaultProps = {
	setUserAnswer: null,
	word: {},
};

export default QuizQuestion;
