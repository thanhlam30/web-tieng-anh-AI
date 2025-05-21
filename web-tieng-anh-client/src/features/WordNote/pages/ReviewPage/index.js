import { Button, Progress, Result } from "antd";
import {
	AnswerCheckBar,
	completeSound,
	correctAnswer,
	QuestionSuggestion,
	QuizQuestion,
	WordFillQuestion,
	WordNoteHeader,
	wrongAnswer,
} from "features/WordNote/common";
import {
	getWordNoteDetail,
	getWordNoteReview,
} from "features/WordNote/wordNoteSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./style.scss";

let audio;
const playAudio = (url) => {
	if (audio) audio.pause();
	audio = new Audio(url);
	audio.load();
	audio.play();
};

function ReviewPage(props) {
	const { wordnoteId } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	const type = Math.round(Math.random());

	const [finishedWords, setFinishedWords] = useState([null]);
	const [percent, setPercent] = useState(0);
	const [userAnswer, setUserAnswer] = useState(undefined);
	const [isCheckAnswer, setIsCheckAnswer] = useState(true);

	const [isCorrectAnswer, setIsCorrectAnswer] = useState(true);
	const [isCompleted, setIsCompleted] = useState(false);
	const [questionType, setQuestionType] = useState(type);

	const { isError, wordNoteDetail, word } = useSelector(
		(state) => state.wordNote
	);

	const increase = () => {
		let newPercent = Math.round(
			(finishedWords.length * 100) / wordNoteDetail.wordNumber
		);
		if (newPercent > 100) {
			newPercent = 100;
		}
		setPercent(newPercent);
	};

	const handleChangeWordReview = (isCorrectAnswer = false) => {
		const newWordIds = [...finishedWords];
		isCorrectAnswer && newWordIds.push(word.id);
		const newType = Math.round(Math.random());
		const values = { type: newType, ids: newWordIds };
		dispatch(getWordNoteReview({ wordnoteId, values }));
		setFinishedWords(newWordIds);
		setQuestionType(newType);
		setUserAnswer(undefined);
	};

	const handleOnCheckAnswer = (isIgnore = true) => {
		if (isIgnore) {
			if (userAnswer === word.name) {
				increase();
				setIsCorrectAnswer(true);
				if (wordNoteDetail.wordNumber === finishedWords.length) {
					handleChangeWordReview(true);
					setIsCompleted(true);
					return;
				}
				playAudio(correctAnswer);
			} else {
				playAudio(wrongAnswer);
				setIsCorrectAnswer(false);
			}
			return isCorrectAnswer;
		} else {
			handleChangeWordReview(isIgnore);
		}
	};

	useEffect(() => {
		const values = { type: questionType, ids: null };
		dispatch(getWordNoteDetail(wordnoteId));
		dispatch(getWordNoteReview({ wordnoteId, values }));
		document.title = "Ôn tập từ vựng";
	}, []);

	return (
		<>
			<div id="review-page">
				<WordNoteHeader
					isReviewPage={true}
					isError={isError}
					wordNoteDetail={wordNoteDetail}
					goBackUrl={`/wordnotes/${wordnoteId}`}
				/>
				{isError ? (
					<Result status="404" title="400" subTitle="An error has occurred" />
				) : (
					<div>
						{!isCheckAnswer && !isCompleted && <div className="overlay"></div>}
						<Progress percent={percent} />
						{word.status === 400 ? (
							<>
								{playAudio(completeSound)}
								<Result
									status="success"
									title="Hoàn thành ôn tập"
									subTitle="Bạn có muốn ôn lại lần nữa không?"
									extra={[
										<Button
											key="cancel"
											onClick={() => history.push(`/wordnotes/${wordnoteId}`)}
										>
											Không
										</Button>,
										<Button
											type="primary"
											key="continue"
											onClick={() => history.go(0)}
										>
											Có
										</Button>,
									]}
								/>
								,
							</>
						) : (
							<>
								<QuestionSuggestion word={word} />
								{questionType === 0 ? (
									<QuizQuestion word={word} setUserAnswer={setUserAnswer} />
								) : (
									<WordFillQuestion word={word} setUserAnswer={setUserAnswer} />
								)}
							</>
						)}
					</div>
				)}
			</div>
			<AnswerCheckBar
				handleOnCheckAnswer={handleOnCheckAnswer}
				userAnswer={userAnswer}
				isCheckAnswer={isCheckAnswer}
				setIsCheckAnswer={setIsCheckAnswer}
				isCorrectAnswer={isCorrectAnswer}
				handleChangeWordReview={handleChangeWordReview}
				isCompleted={isCompleted}
			/>
		</>
	);
}

ReviewPage.propTypes = {};

export default ReviewPage;
