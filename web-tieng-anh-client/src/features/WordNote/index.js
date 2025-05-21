import { Spin } from "antd";
import NotFoundPage from "components/NotFoundPage";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ReviewPage from "./pages/ReviewPage";
import WordPage from "./pages/WordPage";
import "./style.scss";

function WordNotes(props) {
	const { isLoading } = useSelector((state) => state.global);
	const { url } = useRouteMatch();

	return (
		<Spin spinning={isLoading}>
			<div id="word-note-page">
				<div className="word-note-container">
					<Switch>
						<Route exact path={url} component={MainPage} />
						<Route exact path={`${url}/:wordnoteId`} component={WordPage} />
						<Route path={`${url}/:wordnoteId/review`} component={ReviewPage} />
						<Route component={NotFoundPage} />
					</Switch>
				</div>
			</div>
		</Spin>
	);
}
WordNotes.propTypes = {};
WordNotes.defaultProps = {};

export default WordNotes;
