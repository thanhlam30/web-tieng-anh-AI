import { Spin } from "antd";
import NotFoundPage from "components/NotFoundPage";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ParagraphPage from "./pages/ParagraphPage";
import QuestionPage from "./pages/QuestionPage";

Exam.propTypes = {};

function Exam(props) {
	const { url } = useRouteMatch();
	const { isLoading } = useSelector((state) => state.exam);

	return (
		<Spin spinning={isLoading}>
			<Switch>
				<Route exact path={url} component={MainPage} />
				{/* <Route exact path={url} component={ExamDetailPage} /> */}
				<Route exact path={`${url}/questions`} component={QuestionPage} />
				<Route exact path={`${url}/paragraphs`} component={ParagraphPage} />
				<Route
					exact
					path={`${url}/paragraphs/questions`}
					component={QuestionPage}
				/>
				<Route component={NotFoundPage} />
			</Switch>
		</Spin>
	);
}

export default Exam;
