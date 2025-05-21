import { Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import imageNotFound from "assets/images/image-not-found.svg";
import PropTypes from "prop-types";
import React from "react";
import "./style.scss";

function QuestionSuggestion(props) {
	const { word } = props;
	return (
		<div className="question-suggestion">
			<Row justify="space-between" gutter={[24, 24]}>
				<Col xs={24} sm={8} md={8} lg={8} xl={8}>
					<img
						src={word.image}
						alt={word.name}
						onError={(e) => (e.target.src = imageNotFound)}
					/>
				</Col>

				<Col xs={24} sm={16} md={16} lg={16} xl={16}>
					<Title level={4}>{word.definition}</Title>
				</Col>
			</Row>

			{/* <div className="review-question">
				<div className="review-question__image">
					<img
						src={image}
						alt={name}
						onError={(e) => (e.target.src = imageNotFound)}
					/>
				</div>

				<div className="review-question__definition">
					<Title level={4}>{definition}</Title>
				</div>
			</div> */}
		</div>
	);
}

QuestionSuggestion.propTypes = {
	word: PropTypes.object,
};
QuestionSuggestion.defaultProps = {
	word: {},
};
export default QuestionSuggestion;
