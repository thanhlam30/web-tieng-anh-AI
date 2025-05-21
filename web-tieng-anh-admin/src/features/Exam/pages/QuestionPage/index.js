import { Divider } from "antd";
import Title from "antd/lib/typography/Title";
import NotFoundPage from "components/NotFoundPage";
import QuestionDetailModal from "features/Exam/components/QuestionDetailModal";
import QuestionModal from "features/Exam/components/QuestionModal";
import QuestionTable from "features/Exam/components/QuestionTable";
import { fetchQuestions } from "features/Exam/examSlice";
import { useQuery } from "features/Exam/hooks";
import { questionValues } from "features/Exam/initialAndValidateValues";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

QuestionPage.propTypes = {};

function QuestionPage(props) {
	const query = useQuery();
	const dispatch = useDispatch();
	const history = useHistory();

	const { questions } = useSelector((state) => state.exam);

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [initialValue, setInitialValue] = useState(questionValues.initial);
	const [isDetailViewMode, setIsDetailViewMode] = useState(false);

	const examId = +query.get("examId");
	const type = +query.get("part");
	const paragraphId = +query.get("paragraphId");

	useEffect(() => {
		if (paragraphId) {
			dispatch(fetchQuestions({ examId, type }));
		} else {
			if (typeof examId === "number" && typeof type === "number") {
				if (type < 1) {
					history.push(`/admin/exams/questions?examId=${examId}&part=1`);
					dispatch(fetchQuestions({ examId, type: 1 }));
				} else if (type > 7) {
					history.push(`/admin/exams/paragraphs?examId=${examId}&part=7`);
				} else {
					if ([1, 2, 5].includes(type)) {
						dispatch(fetchQuestions({ examId, type }));
					} else {
						history.push(
							`/admin/exams/paragraphs?examId=${examId}&part=${type}`
						);
					}
				}
			}
		}
	}, []);

	return examId && type ? (
		<div>
			<Divider orientation="left">
				<Title level={3}>{`Part ${query.get("part")}`}</Title>
			</Divider>

			<QuestionTable
				questions={
					paragraphId
						? questions.find((p) => p.id === paragraphId)?.questions
						: questions
				}
				setInitialValue={setInitialValue}
				setIsModalVisible={setIsModalVisible}
				setIsDetailViewMode={setIsDetailViewMode}
			/>

			{isModalVisible && (
				<QuestionModal
					isModalVisible={isModalVisible}
					setIsModalVisible={setIsModalVisible}
					initialValue={initialValue}
				/>
			)}

			{isDetailViewMode && (
				<QuestionDetailModal
					isDetailViewMode={isDetailViewMode}
					setIsDetailViewMode={setIsDetailViewMode}
					question={initialValue}
				/>
			)}
		</div>
	) : (
		<NotFoundPage />
	);
}

export default QuestionPage;
