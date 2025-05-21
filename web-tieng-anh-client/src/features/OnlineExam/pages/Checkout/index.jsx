import { Button, Col, Modal, Row, Space, Table, Tag } from "antd";
import Timer from "features/OnlineExam/components/Timer";
import {
	setExamSelected,
	setIsSubmit,
	setScrollId,
	setStatus,
	setsubPartSelected,
} from "features/OnlineExam/onlineExamSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import checkStatusAnswer, {
	checkSelectedAnswer,
} from "utils/checkStatusAnswer";
import {
	default as useLoadDataAfterRefresh,
	default as useWindowUnloadEffect,
} from "utils/useWindowUnloadEffect";
import "./style.scss";
Checkout.propTypes = {};

function Checkout(props) {
	useLoadDataAfterRefresh();

	const history = useHistory();
	const { testId } = useParams();
	const dispatch = useDispatch();

	const { answers, examSelected } = useSelector((state) => state.exam);
	const [result, setResult] = useState([
		"Complete",
		"Complete",
		"Complete",
		"Complete",
		"Complete",
		"Complete",
		"Complete",
	]);
	const [selected, setSelected] = useState([
		"Complete",
		"Complete",
		"Complete",
		"Complete",
		"Complete",
		"Complete",
		"Complete",
	]);

	useWindowUnloadEffect(() => {
		localStorage.setItem("answers", JSON.stringify(answers));
	}, true);
	useEffect(() => {
		document.title = "Nộp bài";
		answers.forEach((element, index) => {
			if (element.status === "") {
				dispatch(setStatus(index));
			}
		});
	}, []);

	useEffect(() => {
		document.getElementById(`top`).scrollIntoView();
	}, []);

	useEffect(() => {
		const tempResult = checkStatusAnswer(answers);
		setResult(tempResult);
		const tempSelected = checkSelectedAnswer(answers);
		setSelected(tempSelected);
	}, [answers]);

	// Modal confirm
	const ReachableContext = React.createContext();
	const UnreachableContext = React.createContext();

	const [modal, contextHolder] = Modal.useModal();

	const config = {
		title: "Do you really want to submit ?",
		content: "Time is still",
		onOk() {
			history.push(`/exams/${testId}/result`);
			dispatch(setIsSubmit(true));
			localStorage.setItem("isSubmit", true);
		},
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
			title: "Did",
			dataIndex: "selected",
			key: "selected",
			render: (selected) => <span style={{ color: "red" }}>{selected}</span>,
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (status) => (
				<>
					<Tag color={status === "Complete" ? "green" : "volcano"} key={status}>
						{status.toUpperCase()}
					</Tag>
				</>
			),
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
			selected: selected[0],
			status: result[0],

			detail: "Detail",
		},
		{
			key: "2",
			question: "7 - 31",
			description: "Part II: Question - Response",
			selected: selected[1],
			status: result[1],
			detail: "Detail",
		},
		{
			key: "3",
			question: "32 - 70",
			description: "Part III: Short Conversations",
			selected: selected[2],
			status: result[2],
			detail: "Detail",
		},
		{
			key: "4",
			question: "71 - 100",
			description: "Part IV: Short Talks",
			selected: selected[3],
			status: result[3],
			detail: "Detail",
		},
	];

	const data_reading = [
		{
			key: "5",
			question: "101 - 130",
			description: "Part V: Incomplete Sentences ",
			selected: selected[4],
			status: result[4],
			detail: "Detail",
		},
		{
			key: "6",
			question: "131 - 146",
			description: "Part VI: Incomplete Sentences ",
			selected: selected[5],
			status: result[5],
			detail: "Detail",
		},
		{
			key: "7",
			question: "147 - 200",
			description: "Part VII: Reading Comprehension",
			selected: selected[6],
			status: result[6],
			detail: "Detail",
		},
	];

	// handle Event

	const handleBackClick = () => {
		if (examSelected === 8) {
			dispatch(setExamSelected(examSelected - 1));
			localStorage.setItem("partSelected", examSelected - 1);
		}

		history.push(`/exams/${testId}/examining`);
	};

	const handleDetailClick = (text, record, index) => {
		localStorage.setItem("partSelected", record.key);
		console.log("record key", record.key);
		dispatch(setExamSelected(record.key));
		dispatch(setsubPartSelected(0));
		dispatch(setScrollId("top"));
		history.push(`/exams/${testId}/examining`);
	};

	return (
		<div id="top">
			<Timer page="checkout" />
			<div className="checkout_wrapper">
				<Space direction="vertical" style={{ width: "100%" }} size="large">
					<div className="checkout_listening">
						<span className="topic">Listening</span>
						<Table
							dataSource={data_listening}
							columns={columns}
							pagination={false}
							scroll={{ x: true }}
						/>
					</div>

					<div className="checkout_reading">
						<span className="topic">Reading</span>
						<Table
							dataSource={data_reading}
							columns={columns}
							pagination={false}
							scroll={{ x: true }}
						/>
					</div>

					<Row gutter={[32, 16]} justify="center" align="middle">
						<Col
							xl={{ span: 3 }}
							lg={{ span: 4 }}
							md={{ span: 6 }}
							sm={{ span: 8 }}
							xs={{ span: 10 }}
						>
							<div className="button_align">
								<Button
									block
									type="primary"
									size="large"
									onClick={handleBackClick}
								>
									Back
								</Button>
							</div>
						</Col>

						<Col
							xl={{ span: 3 }}
							lg={{ span: 4 }}
							md={{ span: 6 }}
							sm={{ span: 8 }}
							xs={{ span: 10 }}
						>
							<ReachableContext.Provider value="">
								<div className="button_align">
									<Button
										block
										type="primary"
										size="large"
										onClick={() => {
											modal.confirm(config);
										}}
									>
										Submit
									</Button>
								</div>
								{contextHolder}
							</ReachableContext.Provider>
						</Col>
					</Row>
				</Space>
			</div>
		</div>
	);
}

export default Checkout;
