import { Spin } from "antd";
import NotFoundPage from "components/NotFoundPage";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import MainPage from "./pages/MainPage";
import TopicPage from "./pages/TopicPage";

function Course(props) {
	const { isLoading } = useSelector((state) => state.course);
	const { url } = useRouteMatch();

	return (
		<Spin spinning={isLoading}>
			<div>
				<Switch>
					<Route exact path={url} component={MainPage} />
					<Route exact path={`${url}/:slug`} component={TopicPage} />
					<Route component={NotFoundPage} />
				</Switch>
			</div>
		</Spin>
	);
}
Course.propTypes = {};
Course.defaultProps = {};

export default Course;
