import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import PropTypes from "prop-types";
import React from "react";
import "./style.scss";

function AnswerCheckBar(props) {
	const {
		handleOnCheckAnswer,
		userAnswer,
		isCheckAnswer,
		setIsCheckAnswer,
		isCorrectAnswer,
		handleChangeWordReview,
		isCompleted,
	} = props;

	return (
		<>
			{!isCompleted && (
				<div
					className={`answer-check-bar${
						isCheckAnswer
							? ""
							: isCorrectAnswer
							? " answer-check-bar--success"
							: " answer-check-bar--danger"
					}`}
				>
					<Row justify="space-between" gutter={[12, 12]}>
						<Col xs={24} sm={12} md={12} lg={12}>
							<Row justify="center" className="notification">
								{isCheckAnswer ? (
									<button
										className="btn btn--normal"
										onClick={() => {
											handleOnCheckAnswer(false);
										}}
									>
										&nbsp;Bỏ qua&nbsp;
									</button>
								) : (
									<div className="user-anwer">
										<Title level={2}>
											{isCorrectAnswer ? (
												<span className="user-anwer--success">
													<CheckCircleFilled /> Chính xác
												</span>
											) : (
												<span className="user-anwer--danger">
													<CloseCircleFilled /> Sai rồi
												</span>
											)}
										</Title>
									</div>
								)}
							</Row>
						</Col>
						<Col xs={24} sm={12} md={12} lg={12}>
							<Row justify="center">
								{isCheckAnswer ? (
									<button
										className={`btn ${userAnswer ? "btn--success" : "disable"}`}
										onClick={() => {
											handleOnCheckAnswer(true);
											setIsCheckAnswer(false);
										}}
										disabled={userAnswer ? false : true}
									>
										Kiểm tra
									</button>
								) : (
									<button
										className={`btn ${
											isCorrectAnswer ? "btn--success" : "btn--danger"
										}`}
										onClick={() => {
											handleChangeWordReview(isCorrectAnswer ? true : false);
											setIsCheckAnswer(true);
										}}
									>
										Tiếp tục
									</button>
								)}
							</Row>
						</Col>
					</Row>
				</div>
			)}
		</>
	);
}

AnswerCheckBar.propTypes = {
	handleChangeWordReview: PropTypes.func,
	handleOnCheckAnswer: PropTypes.func,
	isCheckAnswer: PropTypes.bool,
	isCorrectAnswer: PropTypes.bool,
	setIsCheckAnswer: PropTypes.func,
	setIsCorrectAnswer: PropTypes.func,
	userAnswer: PropTypes.string,
};
AnswerCheckBar.defaultProps = {
	handleChangeWordReview: null,
	handleOnCheckAnswer: null,
	isCheckAnswer: true,
	isCorrectAnswer: true,
	setIsCheckAnswer: null,
	setIsCorrectAnswer: null,
	userAnswer: "",
};

export default AnswerCheckBar;
