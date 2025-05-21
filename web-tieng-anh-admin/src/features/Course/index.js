import { Spin } from "antd";
import NotFoundPage from "components/NotFoundPage";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import CourseDetailPage from "./pages/CourseDetailPage";
import MainPage from "./pages/MainPage";
import TopicPage from "./pages/TopicPage";

function Course(props) {
	const { url } = useRouteMatch();
	const { isLoading } = useSelector((state) => state.course);

	return (
		<Spin spinning={isLoading}>
			<Switch>
				<Route exact path={url} component={MainPage} />

				<Route exact path={`${url}/topics`} component={TopicPage} />
				<Route path={`${url}/:slug`} component={CourseDetailPage} />
				<Route component={NotFoundPage} />
			</Switch>
		</Spin>
	);
}
Course.propTypes = {};

export default Course;
