import React from "react";
import PropTypes from "prop-types";
import { Button, Col, Divider, Row, Tooltip } from "antd";
import Title from "antd/lib/typography/Title";
import GoBackButton from "../GoBackButton";
import { PlaySquareOutlined } from "@ant-design/icons";
import { useRouteMatch } from "react-router-dom";
import "./style.scss";

function WordNoteHeader(props) {
	const { isMainPage, isReviewPage, isError, goBackUrl, wordNoteDetail } =
		props;
	const { url } = useRouteMatch();
	return (
		<div className="word-note-container__header">
			<Row justify={isMainPage ? "start" : "space-around"} align="middle">
				{isMainPage ? (
					<Col>
						{/* Main page */}
						<Title>Wordnote</Title>
					</Col>
				) : isReviewPage ? (
					<>
						{/* Review page */}
						<Col xs={4} sm={4} md={2} lg={1}>
							<GoBackButton href={goBackUrl} tooltip="Quay lại" />
						</Col>
						<Col xs={14} sm={14} md={20} lg={20}>
							<Title>
								{/* {isError ? "Review" : `Review ${wordNoteDetail.name}`} */}
								Ôn tập
							</Title>
						</Col>
						<Col xs={6} sm={6} md={2} lg={2}></Col>
					</>
				) : (
					<>
						{/* Word page */}
						<Col xs={4} sm={4} md={2} lg={1}>
							<GoBackButton href={goBackUrl} tooltip="Quay lại" />
						</Col>
						<Col xs={14} sm={14} md={20} lg={20}>
							<Title>
								{isError ? "Chi tiết wordnote" : wordNoteDetail.name}
							</Title>
						</Col>
						<Col xs={6} sm={6} md={2} lg={2}>
							<Row justify="end">
								<Tooltip title="Ôn tập">
									<Button
										type="primary"
										shape="round"
										size="large"
										icon={<PlaySquareOutlined />}
										href={`${url}/review`}
										disabled={wordNoteDetail.words.length > 1 ? false : true}
									>
										Play game
									</Button>
								</Tooltip>
							</Row>
						</Col>
					</>
				)}
			</Row>

			<Divider />
		</div>
	);
}

WordNoteHeader.propTypes = {
	isMainPage: PropTypes.bool,
	isReviewPage: PropTypes.bool,
	isError: PropTypes.bool,
	goBackUrl: PropTypes.string,
	wordNoteDetail: PropTypes.object,
};
WordNoteHeader.defaultProps = {
	isMainPage: false,
	isReviewPage: false,
	isError: false,
	goBackUrl: "/",
	wordNoteDetail: {},
};

export default WordNoteHeader;
