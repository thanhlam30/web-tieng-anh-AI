import { CheckSquareTwoTone, ClockCircleOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { refreshStore } from "features/OnlineExam/onlineExamSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./style.scss";
CheckInExam.propTypes = {};

function CheckInExam(props) {
	const { setExam } = useSelector((state) => state.exam);
	const dispatch = useDispatch();
	const history = useHistory();
	const [examTitle, setExamTitle] = useState("");
	const { testId } = useParams();

	useEffect(() => {
		document.title = examTitle;
	});

	useEffect(() => {
		if (setExam.length > 0) {
			setExam.find((c) => {
				let temp = c.exams.find((b) => b.slug === testId);
				if (temp !== null && temp !== undefined) {
					console.log(temp);
					setExamTitle(temp.name);
				}
				return temp;
			});
		}
	}, [setExam, testId]);

	function handleOnClick() {
		dispatch(refreshStore());
		localStorage.clear();
		history.replace(`/exams/${testId}/examining`);
	}

	return (
		<div className="checkin-exam">
			<Space direction="vertical" size="large">
				<div className="checkin-exam_title">
					<span>{examTitle}</span>
				</div>

				<div className="checkin-exam_info">
					<Space direction="vertical">
						<span className="checkin-exam_info--time total--time ">
							<ClockCircleOutlined />
							&nbsp; Total time: 120
						</span>
						<span className="checkin-exam_info--time">
							<CheckSquareTwoTone />
							&nbsp; Listening: 45
						</span>
						<span className="checkin-exam_info--time">
							<CheckSquareTwoTone />
							&nbsp; Reading : 75
						</span>
					</Space>
				</div>

				<div className="checkin-exam_button">
					<Button
						type="primary"
						block
						shape="round"
						className="checkin-exam_button--width"
						onClick={handleOnClick}
					>
						START
					</Button>
				</div>
			</Space>
		</div>
	);
}

export default CheckInExam;
