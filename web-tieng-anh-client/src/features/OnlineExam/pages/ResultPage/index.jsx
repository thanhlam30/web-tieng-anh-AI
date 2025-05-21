import { HomeOutlined, StarTwoTone } from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import {
	fetchResult,
	refreshStore,
	setExamSelected,
	setScrollId,
	setsubPartSelected,
	writeResultToExam,
} from "features/OnlineExam/onlineExamSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { handleAnswer } from "utils/handleDataAnswer";
import {
	writeResultToAnswerSheet,
	writeTranScript,
} from "utils/writeResultToAnswerSheet";
import "./style.scss";
ResultPage.propTypes = {};

function ResultPage(props) {
	const { testId } = useParams();
	const dispatch = useDispatch();
	const { answers, result } = useSelector((state) => state.exam);
	const {
		listenPoint,
		readPoint,
		listenNumber,
		readNumber,
		part1Number,
		part2Number,
		part3Number,
		part4Number,
		part5Number,
		part6Number,
		part7Number,
	} = result;
	const answerToPost = handleAnswer(answers);
	const history = useHistory();

	useEffect(() => {
		document.title = "Kết quả";
		dispatch(
			fetchResult({
				slug: testId,
				answers: answerToPost,
			})
		);
	}, []);

	// useEffect(() => {
	//     let newSheet, newTranscript;
	//     if (!(Object.keys(result).length === 0 && result.constructor === Object)) {
	//         newSheet = result && writeResultToAnswerSheet(result);
	//         newTranscript = result && writeTranScript(result);
	//         dispatch(writeResultToExam(newSheet));
	//         dispatch(writeTranScript(newTranscript));
	//         localStorage.setItem('answers', JSON.stringify(newSheet));
	//         localStorage.setItem('transcript', JSON.stringify(newTranscript));

	//     }
	// }, [result])

	useEffect(() => {
		document.getElementById(`top`).scrollIntoView();
	}, []);

	const handleDetailClick = (text, record, index) => {
		localStorage.setItem("partSelected", record.key);
		dispatch(setExamSelected(record.key));
		dispatch(setsubPartSelected(0));
		dispatch(setScrollId("top"));
		history.push(`/exams/${testId}/examining`);
	};

	const columns = [
		{
			title: "Question",
			dataIndex: "question",
			key: "question",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},

		{
			title: "Number of correct",
			dataIndex: "correct",
			key: "correct",
			render: (selected) => <span style={{ color: "red" }}>{selected}</span>,
		},

		{
			title: "",
			dataIndex: "detail",
			key: "detail",
			render: (text, record, index) => (
				<a onClick={() => handleDetailClick(text, record, index)}>{text}</a>
			),
		},
	];

	const data_listening = [
		{
			key: "1",
			question: "1 - 6",
			description: "Part I: Picture Description",
			correct: `${part1Number}/6`,
			detail: "Detail",
		},
		{
			key: "2",
			question: "7 - 31",
			description: "Part II: Question - Response",
			correct: `${part2Number}/25`,
			detail: "Detail",
		},
		{
			key: "3",
			question: "32 - 70",
			description: "Part III: Short Conversations",
			correct: `${part3Number}/39`,
			detail: "Detail",
		},
		{
			key: "4",
			question: "71 - 100",
			description: "Part IV: Short Talks",
			correct: `${part4Number}/30`,
			detail: "Detail",
		},
	];

	const data_reading = [
		{
			key: "5",
			question: "101 - 130",
			description: "Part V: Incomplete Sentences ",
			correct: `${part5Number}/30`,
			detail: "Detail",
		},
		{
			key: "6",
			question: "131 - 146",
			description: "Part VI: Incomplete Sentences ",
			correct: `${part6Number}/16`,
			detail: "Detail",
		},
		{
			key: "7",
			question: "147 - 200",
			description: "Part VII: Reading Comprehension",
			correct: `${part7Number}/54`,
			detail: "Detail",
		},
	];

	const handleExitClick = () => {
		dispatch(refreshStore());
		history.push("/");
	};

	return (
		<div id="top">
			<div className="result_wrapper">
				<Space direction="vertical" style={{ width: "100%" }} size="large">
					<div className="result_infomation">
						<span className="result_title_test">ETS - 2020</span>
						<span className="result_info_additional">
							Thank you for completing the trial tests on TOEIC Exam Store.
						</span>
					</div>

					<div className="result_total_score">
						<span>
							{" "}
							<StarTwoTone /> Total Score:{" "}
						</span>
						<span>{listenPoint + readPoint}</span>
					</div>

					<div className="result_listening">
						<div className="result_header">
							<span className="topic">Listening({listenNumber}/100)</span>
							<span className="topic sub-score">Score {listenPoint}/495</span>
						</div>

						<Table
							dataSource={data_listening}
							columns={columns}
							pagination={false}
							scroll={{ x: true }}
						/>
					</div>

					<div className="result_reading">
						<div className="result_header">
							<span className="topic">Reading({readNumber}/100)</span>
							<span className="topic sub-score">Score {readPoint}/495</span>
						</div>
						<Table
							dataSource={data_reading}
							columns={columns}
							pagination={false}
							scroll={{ x: true }}
						/>
					</div>

					<div className="result_button">
						<Button
							type="primary"
							onClick={handleExitClick}
							icon={<HomeOutlined />}
							size="large"
							style={{ padding: "0 3rem" }}
						>
							Exit
						</Button>
					</div>
				</Space>
			</div>
		</div>
	);
}

export default ResultPage;
