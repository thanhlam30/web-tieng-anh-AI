import { Col, Row } from "antd";
import AnswerSheet from "features/OnlineExam/components/AnswerSheet";
import Timer from "features/OnlineExam/components/Timer";
import ToeicPart from "features/OnlineExam/components/ToeicPart";
import { refreshStore } from "features/OnlineExam/onlineExamSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Prompt, useParams } from "react-router";
import "./style.scss";

function Examining(props) {
	const { testId } = useParams();
	const dispatch = useDispatch();

	const { isSubmit } = useSelector((state) => state.exam);

	useEffect(() => {
		document.title = "Thi online";
	}, []);

	return (
		<>
			<Prompt
				message={(location, action) => {
					return location.pathname.startsWith(`/exams/${testId}`)
						? true
						: "Do you really want to leave the test ? ";
				}}
			/>

			<Row gutter={[16, 16]}>
				<Col span={24}>{isSubmit ? "" : <Timer />}</Col>
			</Row>
			<div className="examining">
				<Row gutter={[16, 16]}>
					<Col
						xl={{ span: 17 }}
						lg={{ span: 16 }}
						md={{ span: 24 }}
						sm={{ span: 24 }}
						xs={{ span: 24 }}
					>
						<ToeicPart />
					</Col>
					<Col
						xl={{ span: 7 }}
						lg={{ span: 8 }}
						md={{ span: 0 }}
						sm={{ span: 0 }}
						xs={{ span: 0 }}
					>
						<AnswerSheet />
					</Col>
				</Row>
			</div>
			{/* <ReachableContext.Provider value=''>
                {contextHolder}
            </ReachableContext.Provider> */}
		</>
	);
}

export default Examining;
